import { useState, useEffect } from "react";
import { uploadImage } from "@/lib/uploadImage";
import { Button } from "@/components/ui/button";

const ProfileImageUploader = ({ onFileSelect, initialValue = null }) => {
  const [preview, setPreview] = useState(initialValue);
  const [uploading, setUploading] = useState(false);

  // Update preview if initialValue changes
  useEffect(() => {
    setPreview(initialValue);
  }, [initialValue]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const publicUrl = await uploadImage(file);
      if (!publicUrl) throw new Error("Failed to upload image");

      setPreview(publicUrl);
      onFileSelect(publicUrl);
    } catch (err) {
      console.error("Upload error:", err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center mb-6">
      {/* Profile Image Preview */}
      <label
        htmlFor="profile-upload"
        className="border bg-white text-sm w-35 h-35 border-gray-500 py-10 mr-4 flex flex-col rounded-full items-center gap-4 cursor-pointer relative overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="profile preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <p className="text-gray-500">+</p>
            <p className="text-gray-500">Upload Image</p>
          </>
        )}
        <input
          id="profile-upload"
          name="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>

      {/* Upload Button */}
      <Button
        className={`border-1 border-black text-black rounded-full font-normal ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => document.getElementById("profile-upload").click()}
        disabled={uploading}
        type="button"
      >
        {uploading ? "Uploading..." : "Upload profile picture"}
      </Button>
    </div>
  );
};

export default ProfileImageUploader;
