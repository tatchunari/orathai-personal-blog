import AdminPanel from "@/components/article-management/AdminPanel";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import supabase from "@/lib/supabaseClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingScreen from "../LoadingScreen";
import ThumbnailUploader from "../../components/sub-components/ImageUploader";
import { useQuery } from "@/hooks/useQuery";

const AdminCreateArticle = () => {
  // const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();
  const { data: categories } = useQuery("category");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [postForm, setPostForm] = useState({
    category: "",
    author: "",
    title: "",
    introduction: "",
    content: "",
    thumbnail_image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setPostForm((prev) => ({ ...prev, category: value }));
  };

  // console.log("Form", postForm);

  const handleSubmit = async (status) => {
    setIsLoading(true);
    try {
      // 1️⃣ Get current user session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert("Please log in first!");
        setIsLoading(false);
        return;
      }

      const token = session.access_token; // JWT token

      // 2️⃣ Prepare payload
      const payload = {
        author: postForm.author,
        title: postForm.title,
        introduction: postForm.introduction,
        content: postForm.content,
        category: postForm.category,
        thumbnail_image: postForm.thumbnail_image || null,
        status: status,
      };

      console.log("Submitting post:", payload);

      // 3️⃣ Send POST request with Authorization header
      await axios.post(
        "https://orathai-personal-blog-backend.vercel.app/posts",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ pass token here
          },
        }
      );

      alert(
        `Article ${
          status === "Published" ? "published" : "saved as draft"
        } successfully!`
      );
      navigate("/admin");
    } catch (error) {
      setError(error.message);
      console.log("Errors: ", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen">
      <AdminPanel />

      {/* Main Create Aricle Section */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create article</h2>
          <div className="space-x-2">
            <Button
              className="px-8 py-2 rounded-full"
              variant="outline"
              onClick={() => handleSubmit("Draft")}
            >
              Save as draft
            </Button>
            <Button
              onClick={() => handleSubmit("Published")}
              className="px-8 py-2 rounded-full bg-black text-white"
            >
              Save and publish
            </Button>
          </div>
        </div>

        <form className="space-y-7 max-w-4xl">
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-[#75716B] font-medium mb-2"
            >
              Thumbnail image
            </label>

            {/* Thumbnail Image Upload */}
            <ThumbnailUploader
              onFileSelect={(url) =>
                setPostForm((prev) => ({ ...prev, thumbnail_image: url }))
              }
            />
          </div>

          <div>
            <label htmlFor="category" className="text-[#75716B]">
              Category
            </label>
            <Select name="category" onValueChange={handleCategoryChange}>
              <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground border-[#75716B]">
                <SelectValue
                  className="text-[#75716B]"
                  placeholder="Select category"
                />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-[#75716B]" htmlFor="author">
              Author name
            </label>
            <Input
              name="author"
              className="mt-1 max-w-lg text-[#75716B]"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-[#75716B]" htmlFor="title">
              Title
            </label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleInputChange}
              className="border-[#75716B] mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>

          <div>
            <label className="text-[#75716B]" htmlFor="introduction">
              Introduction (max 120 letters)
            </label>
            <Textarea
              type="text"
              name="introduction"
              placeholder="Introduction"
              onChange={handleInputChange}
              rows={3}
              className="border-[#75716B] mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              maxLength={120}
            />
          </div>

          <div>
            <label className="text-[#75716B]" htmlFor="content">
              Content
            </label>
            <Textarea
              name="content"
              placeholder="Content"
              rows={20}
              onChange={handleInputChange}
              className="border-[#75716B] mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminCreateArticle;
