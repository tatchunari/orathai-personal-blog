import { useState } from "react";

import AdminPanel from "./AdminPanel";
import ThumbnailUploader from "../sub-components/ImageUploader";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const EditArticleForm = ({ post, categories, onSubmit }) => {
  const [formData, setFormData] = useState({
    thumbnail_image: post.thumbnail_image || "",
    author: post.author,
    category: post.category || "",
    title: post.title || "",
    introduction: post.introduction || "",
    content: post.content || "",
  });

  const [errors, setErrors] = useState({
    thumbnail_image: "",
    category: "",
    title: "",
    introduction: "",
    content: "",
  });

  console.log("Form data:", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleThumbnailSelect = (url) => {
    setFormData((prev) => ({ ...prev, thumbnail_image: url }));
    // Clear thumbnail error when image is selected
    if (errors.thumbnail_image) {
      setErrors((prev) => ({ ...prev, thumbnail_image: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      thumbnail_image: "",
      category: "",
      title: "",
      introduction: "",
      content: "",
    };
    let isValid = true;

    // Validate thumbnail image
    if (!formData.thumbnail_image) {
      newErrors.thumbnail_image = "Thumbnail image is required";
      isValid = false;
    }

    // Validate category
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
      isValid = false;
    }

    // Validate introduction
    if (!formData.introduction.trim()) {
      newErrors.introduction = "Introduction is required";
      isValid = false;
    } else if (formData.introduction.trim().length < 10) {
      newErrors.introduction = "Introduction must be at least 10 characters";
      isValid = false;
    }

    // Validate content
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
      isValid = false;
    } else if (formData.content.trim().length < 20) {
      newErrors.content = "Content must be at least 20 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (status) => {
    // Validate form before submitting
    if (!validateForm()) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    onSubmit({ ...formData, status });
  };

  return (
    <div className="flex h-screen">
      <AdminPanel />

      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit article</h2>
          <div className="space-x-2">
            <Button
              className="px-8 py-2 rounded-full"
              variant="outline"
              onClick={() => handleSubmit("Draft")}
            >
              Save as draft
            </Button>
            <Button
              className="px-8 py-2 cursor-pointer rounded-full bg-black text-white"
              onClick={() => handleSubmit("Published")}
            >
              Save
            </Button>
          </div>
        </div>

        <form className="space-y-7 max-w-4xl">
          {/* Thumbnail */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Thumbnail image <span className="text-red-500">*</span>
            </label>
            <ThumbnailUploader
              initialValue={post.thumbnail_image}
              onFileSelect={handleThumbnailSelect}
            />
            {errors.thumbnail_image && (
              <p className="mt-1 text-sm text-red-600">
                {errors.thumbnail_image}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, category: value }));
                // Clear category error when selected
                if (errors.category) {
                  setErrors((prev) => ({ ...prev, category: "" }));
                }
              }}
            >
              <SelectTrigger
                className={`max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 ${
                  errors.category
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-muted-foreground"
                }`}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
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

          {/* Author */}
          <div>
            <label className="block text-gray-700">Author name</label>
            <Input
              defaultValue={post.author}
              className="mt-1 max-w-lg"
              disabled
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.title}
              name="title"
              placeholder="Article title"
              onChange={handleChange}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
                errors.title
                  ? "border-red-500 focus-visible:border-red-500"
                  : "focus-visible:border-muted-foreground"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Introduction */}
          <div>
            <label className="block text-gray-700">
              Introduction (max 120 letters){" "}
              <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="introduction"
              value={formData.introduction}
              placeholder="Introduction"
              onChange={handleChange}
              rows={3}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
                errors.introduction
                  ? "border-red-500 focus-visible:border-red-500"
                  : "focus-visible:border-muted-foreground"
              }`}
              maxLength={120}
            />
            {errors.introduction && (
              <p className="mt-1 text-sm text-red-600">{errors.introduction}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="content"
              value={formData.content}
              placeholder="Content"
              onChange={handleChange}
              rows={20}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
                errors.content
                  ? "border-red-500 focus-visible:border-red-500"
                  : "focus-visible:border-muted-foreground"
              }`}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>
        </form>

        <button className="underline underline-offset-2 hover:text-muted-foreground text-sm font-medium flex items-center gap-1 mt-4">
          <FaRegTrashAlt className="h-5 w-5" />
          Delete article
        </button>
      </main>
    </div>
  );
};
