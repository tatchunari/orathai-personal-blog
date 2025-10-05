import AdminPanel from "@/components/article-management/AdminPanel";
import ProfileImageUploader from "@/components/sub-components/profileImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

export const EditProfileForm = ({ profile, onSubmit }) => {
  const [formData, setFormData] = useState({
    avatar_url: profile?.avatar_url || "",
    name: profile?.name || "",
    bio: profile?.bio || "",
  });

  const [errors, setErrors] = useState({}); // 🔴 store error messages

  const nameInputRef = useRef();
  const bioInputRef = useRef();

  const handleSubmit = () => {
    const name = nameInputRef.current?.value.trim();
    const bio = bioInputRef.current?.value.trim();

    const newErrors = {};

    // ✅ Validation rules
    if (!name) newErrors.name = "Full name is required.";
    if (!bio) newErrors.bio = "Bio cannot be empty.";
    else if (bio.length > 120)
      newErrors.bio = "Bio must be 120 characters or less.";

    setErrors(newErrors);

    // stop submit if errors exist
    if (Object.keys(newErrors).length > 0) return;

    const updateProfileValue = {
      name,
      bio,
      avatar_url: formData.avatar_url,
    };

    console.log("Submitting profile data:", updateProfileValue);
    onSubmit(updateProfileValue);
  };

  return (
    <div className="flex h-screen">
      <AdminPanel />

      {/* Main Admin Profile Section */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <Button
            className="px-8 py-2 rounded-full bg-black text-white"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>

        <form className="max-w-2xl space-y-7">
          {/* Profile Image Uploader */}
          <ProfileImageUploader
            onFileSelect={(url) =>
              setFormData((prev) => ({ ...prev, avatar_url: url }))
            }
            initialValue={formData.avatar_url}
          />

          {/* Full Name */}
          <div>
            <label htmlFor="name">Full Name</label>
            <Input
              id="name"
              defaultValue={profile.name}
              ref={nameInputRef}
              className={`mt-1 py-3 border-[#DAD6D1] rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
                errors.name
                  ? "border-red-500"
                  : "focus-visible:border-muted-foreground"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name}</p>
            )}
          </div>

          {/* Username (disabled) */}
          <div>
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              defaultValue={profile.username}
              disabled
              className="mt-1 py-3 border-[#DAD6D1] rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>

          {/* Email (disabled) */}
          <div>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              defaultValue={profile.email}
              disabled
              className="mt-1 py-3 border-[#DAD6D1] rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio">Bio (max 120 letters)</label>
            <Textarea
              id="bio"
              ref={bioInputRef}
              defaultValue={profile.bio}
              rows={10}
              className={`mt-1 py-3 border-[#DAD6D1] rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
                errors.bio
                  ? "border-red-500"
                  : "focus-visible:border-muted-foreground"
              }`}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-2">{errors.bio}</p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfileForm;
