// src/context/authentication.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from '../lib/supabaseClient';

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: false,
    getUserLoading: false,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  // Fetch current logged-in user
  const fetchUser = async () => {
    setState((prev) => ({ ...prev, getUserLoading: true }));
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      setState((prev) => ({
        ...prev,
        user: null,
        error: error.message,
        getUserLoading: false,
      }));
    } else {
      setState((prev) => ({ ...prev, user, getUserLoading: false }));
    }
  };

  useEffect(() => {
    fetchUser();

    // Listen to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
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
  const register = async ({ email, password, name }) => {
  try {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    // 1️⃣ Sign up user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    const userId = authData.user.id; // this will be used for profile

    // 2️⃣ Create profile in 'profiles' table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,       // matches auth user id
          name: name,       // provided by user
          role: 'user',     // default role
        },
      ]);

    if (profileError) throw profileError;

    setState((prev) => ({ ...prev, loading: false }));
    navigate("/signup/success");

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

      setState((prev) => ({ ...prev, user: data.user, loading: false }));
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Custom hook
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
