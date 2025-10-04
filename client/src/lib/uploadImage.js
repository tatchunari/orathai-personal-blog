// lib/uploadThumbnail.ts
import supabase from "./supabaseClient";

export const uploadImage = async (file) => {
  if (!file) return null;

  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("attachments") 
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data: publicUrl } = supabase.storage
    .from("attachments")
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
};
