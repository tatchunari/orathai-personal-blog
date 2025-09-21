import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import supabase from '../lib/supabaseClient';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: false,
    getUserLoading: false,
    error: null,
    user: null,
    profile: null
  });

  const navigate = useNavigate();

  // Fetch current logged-in user
  const fetchUser = async () => {
    // console.log(`fetchUser....`);
    setState((prev) => ({ ...prev, getUserLoading: true }));
    const { data: { user }, error } = await supabase.auth.getUser();

    // console.log(`fetchUser data: `, user)
    

    if (error) {
      console.error(error);
      setState((prev) => ({
        ...prev,
        user: null,
        error: error.message,
        getUserLoading: false,
      }));
    } else {
      setState((prev) => ({ ...prev, user, getUserLoading: false }));
      getProfileById(user.id)
    }
  };

  // Get Profile data when user log in
  const getProfileById = async (id) => {
      try {
        setState((prev) => ({ ...prev, getUserLoading: true, error: null }));

        if (!id) throw new Error("No user logged in");

        const { data, error } = await supabase
          .from("profiles")
          .select("id, name, bio, role")
          .eq("id", id)
          .single();

          // console.log("Profile Data", data);
        if (error) throw error;

        setState((prev) => ({
          ...prev,
          profile: data,
          getUserLoading: false,
        }));

        return data;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          profile: null,
          getUserLoading: false,
          error: error.message,
        }));
        return null;
      }
    };
  
  // Save Profile data when user register
  const saveProfile = async (user) => {
      try {
        if (!user) throw new Error("No user to save profile for");

        const { error } = await supabase.from("profiles").insert([
          {
            id: user.id,
            name: user.email.split("@")[0], 
            bio: "",
            role: "user",
          },
        ]);

        if (error) throw error;
      } catch (error) {
        console.error("Error saving profile:", error.message);
      }
    };

  useEffect(() => {
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setState((prev) => ({ ...prev, user: session.user }));
        } else {
          setState((prev) => ({ ...prev, user: null }));
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Register a new user
  const register = async ({ email, password }) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;

      await saveProfile(data.user);

      setState((prev) => ({ ...prev, loading: false }));
      navigate("/sign-up/success");
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error.message }));
      return { error: error.message };
    }
  };

  // Login existing user
  const login = async ({ email, password }) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Login data : ", JSON.stringify(data));

      setState((prev) => ({ ...prev, user: data.user, loading: false }));
      await getProfileById(data.user.id);
      navigate("/");
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error.message }));
      return { error: error.message };
    }
    
  };

  // Logout user
  const logout = async () => {
    await supabase.auth.signOut();
    setState({ user: null, loading: false, error: null });
    navigate("/");
  };

  //  Check Admin Role
  const isAdmin = useMemo(() => state.profile?.role === 'admin');

  const isAuthenticated = Boolean(state.user);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        isAuthenticated,
        fetchUser,
        isAdmin
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Custom hook
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
