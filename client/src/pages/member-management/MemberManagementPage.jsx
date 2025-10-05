import { useState, useEffect } from "react";
import Navbar from "@/components/sub-components/Navbar";
import Footer from "@/components/sub-components/Footer";
import ProfileImageUploader from "@/components/sub-components/profileImageUploader";
import { useNavigate } from "react-router-dom";
import { X, User, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/authentication";
import LoadingScreen from "../LoadingScreen";
import { InlineLoadingScreen } from "@/components/sub-components/InlineLoadingScreen";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { state } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    avatar_url: "",
    name: "",
    username: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!state.profile?.id) return;

      try {
        const response = await axios.get(
          `https://orathai-personal-blog-backend.vercel.app/profiles/${state.profile.id}`
        );
        setProfile(response.data);
        setFormData({
          avatar_url: response.data.avatar_url || "",
          name: response.data.name || "",
          username: response.data.username || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">
                Failed to fetch profile
              </h2>
              <p className="text-sm">Please try again later.</p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [state.profile?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      username: "",
    };
    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSaving(true);

      await axios.put(
        `https://orathai-personal-blog-backend.vercel.app/profiles/${state.profile.id}`,
        {
          name: formData.name.trim(),
          username: formData.username.trim(),
          avatar_url: formData.avatar_url,
        }
      );

      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Profile updated successfully
            </h2>
            <p className="text-sm">Your profile changes have been saved.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to update profile</h2>
            <p className="text-sm">Please try again later.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <InlineLoadingScreen />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen md:p-8">
        <div className="max-w-4xl mx-auto overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center p-6">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={formData.avatar_url}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 flex flex-row justify-center items-center gap-4">
              <h1 className="text-2xl text-black font-bold">{formData.name}</h1>
              <p className="text-2xl font-bold text-gray-700">|</p>
              <h1 className="text-2xl font-bold text-gray-600">Profile</h1>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden p-4">
            <div className="flex justify-start gap-5 items-center mb-4">
              <div className="flex items-center bg-gray-200 p-3 rounded-md space-x-2 text-foreground font-medium cursor-default">
                <User className="h-5 w-5 mb-1" />
                <span>Profile</span>
              </div>
              <a
                onClick={() => navigate("/reset-password")}
                className="flex items-center gap-2 p-3 text-muted-foreground transition-colors hover:bg-gray-200 rounded-md cursor-pointer"
              >
                <Lock className="h-5 w-5 mb-1" />
                Reset password
              </a>
            </div>
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={formData.avatar_url}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <h2 className="ml-3 text-xl font-semibold">{formData.name}</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 p-6">
              <nav>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-foreground font-medium p-3 bg-gray-200 rounded-md cursor-default">
                    <User className="h-5 w-5 mb-1" />
                    <span>Profile</span>
                  </div>
                  <a
                    onClick={() => navigate("/reset-password")}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground p-3 hover:bg-gray-200 rounded-md cursor-pointer"
                  >
                    <Lock className="h-5 w-5 mb-1" />
                    Reset password
                  </a>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-[#EFEEEB] md:m-2 md:shadow-md md:rounded-lg">
              <ProfileImageUploader
                onFileSelect={(url) =>
                  setFormData((prev) => ({ ...prev, avatar_url: url }))
                }
                initialValue={formData.avatar_url}
              />

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
                      errors.name
                        ? "border-red-500 focus-visible:border-red-500"
                        : "focus-visible:border-muted-foreground"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
                      errors.username
                        ? "border-red-500 focus-visible:border-red-500"
                        : "focus-visible:border-muted-foreground"
                    }`}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-black px-8 py-2 mt-2 bg-foreground text-white hover:bg-gray-800 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
