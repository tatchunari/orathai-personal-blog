import { useState, useEffect } from "react";
import { CiImageOn } from "react-icons/ci";
import { uploadImage } from "@/lib/uploadImage";

const ThumbnailUploader = ({ onFileSelect, initialValue = null }) => {
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

  const handleRemove = () => {
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      {/* Preview Box */}
      <div className="relative w-full max-w-lg h-64 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 overflow-hidden flex justify-center items-center">
        {preview ? (
          <>
            <img
              src={preview}
              alt="thumbnail preview"
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow"
            >
              ✕
            </button>
          </>
        ) : (
          <div className="text-center space-y-2">
            <CiImageOn className="mx-auto h-8 w-8 text-gray-400" />
            <p className="text-gray-500 text-sm">
              {uploading ? "Uploading..." : "No image selected"}
            </p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <label
        htmlFor="file-upload"
        className={`px-8 py-2 rounded-full border cursor-pointer transition-colors ${
          uploading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-background text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground"
        }`}
      >
        {uploading ? "Uploading..." : "Upload thumbnail image"}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default ThumbnailUploader;
