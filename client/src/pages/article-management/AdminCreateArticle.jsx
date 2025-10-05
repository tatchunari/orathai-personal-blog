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
  const [errors, setErrors] = useState({
    category: "",
    author: "",
    title: "",
    introduction: "",
    content: "",
    thumbnail_image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({
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

  const handleCategoryChange = (value) => {
    setPostForm((prev) => ({ ...prev, category: value }));
    // Clear category error when selected
    if (errors.category) {
      setErrors((prev) => ({
        ...prev,
        category: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      category: "",
      author: "",
      title: "",
      introduction: "",
      content: "",
      thumbnail_image: "",
    };
    let isValid = true;

    // Validate thumbnail image
    if (!postForm.thumbnail_image) {
      newErrors.thumbnail_image = "Thumbnail image is required";
      isValid = false;
    }

    // Validate category
    if (!postForm.category.trim()) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    // Validate author
    if (!postForm.author.trim()) {
      newErrors.author = "Author name is required";
      isValid = false;
    } else if (postForm.author.trim().length < 2) {
      newErrors.author = "Author name must be at least 2 characters";
      isValid = false;
    }

    // Validate title
    if (!postForm.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (postForm.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
      isValid = false;
    }

    // Validate introduction
    if (!postForm.introduction.trim()) {
      newErrors.introduction = "Introduction is required";
      isValid = false;
    } else if (postForm.introduction.trim().length < 10) {
      newErrors.introduction = "Introduction must be at least 10 characters";
      isValid = false;
    }

    // Validate content
    if (!postForm.content.trim()) {
      newErrors.content = "Content is required";
      isValid = false;
    } else if (postForm.content.trim().length < 20) {
      newErrors.content = "Content must be at least 20 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (status) => {
    // Validate form before submitting
    if (!validateForm()) {
      alert("Please fill in all required fields correctly.");
      return;
    }

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
        author: postForm.author.trim(),
        title: postForm.title.trim(),
        introduction: postForm.introduction.trim(),
        content: postForm.content.trim(),
        category: postForm.category.trim(),
        thumbnail_image: postForm.thumbnail_image,
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
      alert("Failed to create article. Please try again.");
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

      {/* Main Create Article Section */}
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
              Thumbnail image <span className="text-red-500">*</span>
            </label>

            {/* Thumbnail Image Upload */}
            <ThumbnailUploader
              onFileSelect={(url) => {
                setPostForm((prev) => ({ ...prev, thumbnail_image: url }));
                if (errors.thumbnail_image) {
                  setErrors((prev) => ({ ...prev, thumbnail_image: "" }));
                }
              }}
            />
            {errors.thumbnail_image && (
              <p className="mt-1 text-sm text-red-600">
                {errors.thumbnail_image}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="text-[#75716B]">
              Category <span className="text-red-500">*</span>
            </label>
            <Select name="category" onValueChange={handleCategoryChange}>
              <SelectTrigger
                className={`max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 ${
                  errors.category
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-muted-foreground border-[#75716B]"
                }`}
              >
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
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="text-[#75716B]" htmlFor="author">
              Author name <span className="text-red-500">*</span>
            </label>
            <Input
              name="author"
              value={postForm.author}
              className={`mt-1 max-w-lg text-[#75716B] ${
                errors.author ? "border-red-500" : ""
              }`}
              onChange={handleInputChange}
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author}</p>
            )}
          </div>

          <div>
            <label className="text-[#75716B]" htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={postForm.title}
              onChange={handleInputChange}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
                errors.title
                  ? "border-red-500 focus-visible:border-red-500"
                  : "border-[#75716B] focus-visible:border-muted-foreground"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="text-[#75716B]" htmlFor="introduction">
              Introduction (max 120 letters){" "}
              <span className="text-red-500">*</span>
            </label>
            <Textarea
              type="text"
              name="introduction"
              placeholder="Introduction"
              value={postForm.introduction}
              onChange={handleInputChange}
              rows={3}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
                errors.introduction
                  ? "border-red-500 focus-visible:border-red-500"
                  : "border-[#75716B] focus-visible:border-muted-foreground"
              }`}
              maxLength={120}
            />
            {errors.introduction && (
              <p className="mt-1 text-sm text-red-600">{errors.introduction}</p>
            )}
          </div>

          <div>
            <label className="text-[#75716B]" htmlFor="content">
              Content <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="content"
              placeholder="Content"
              rows={20}
              value={postForm.content}
              onChange={handleInputChange}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
                errors.content
                  ? "border-red-500 focus-visible:border-red-500"
                  : "border-[#75716B] focus-visible:border-muted-foreground"
              }`}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminCreateArticle;
