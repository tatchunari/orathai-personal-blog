import { useAuth } from "@/context/authentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../LoadingScreen";
import { EditProfileForm } from "@/components/ArticleManagement/EditProfileForm";

const AdminProfile = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  const handleUpdateProfile = async (formData) => {
    console.log("Data being sent to API:", formData);
    console.log("Profile ID:", state.profile.id);

    try {
      const response = await axios.put(
        `https://orathai-personal-blog-backend.vercel.app/profiles/${state.profile.id}`,
        formData
      );
      console.log("API Response:", response.data);
      alert("Profile updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Edit Profile failed:", err);
      console.error("Error details:", err.response?.data);
      alert("Failed to update profile");
    }
  };

  // Check if profile data is loaded
  if (!state.profile) return <LoadingScreen />;

  return (
    <EditProfileForm profile={state.profile} onSubmit={handleUpdateProfile} />
  );
};

export default AdminProfile;
