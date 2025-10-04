import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminPanel from "@/components/article-management/AdminPanel";

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
import { FaRegTrashAlt } from "react-icons/fa";

import { useQuery } from "@/hooks/useQuery";
import LoadingScreen from "../LoadingScreen";
import NotFoundPage from "../NotFoundPage";
import ThumbnailUploader from "@/components/ImageUploader";

const AdminEditArticle = () => {
  const { id } = useParams();
  const { data: post, loading } = useQuery(`posts/${id}`, [id]);
  const { data: categories } = useQuery("category");

  const API_BASE = "https://orathai-personal-blog-backend.vercel.app";
  const handleSubmit = async (formData) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE}/posts/${id}`, formData);
      if (response.status === 200) {
        alert("Post updated successfully!");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update post.");
    }
  };

  if (loading) return <LoadingScreen />;
  if (!post) return <NotFoundPage />;

  if (post && categories) {
    return (
      <AdminEditArticleForm
        post={post}
        categories={categories}
        onSubmit={handleSubmit}
      />
    );
  }

  return <div>Data not ready</div>;
};

const AdminEditArticleForm = ({ post, categories, onSubmit }) => {
  // const { id } = useParams();
  // const { data: post, loading } = useQuery(`posts/${id}`, [id]);
  // const { data: categories } = useQuery("category");

  const [formData, setFormData] = useState({
    thumbnail_image: post.thumbnail_image || "",
    author: post.author,
    category: post.category || "",
    title: post.title || "",
    introduction: post.introduction || "",
    content: post.content || "",
  });

  // useEffect(() => {
  //   if (post && categories) {
  //     setFormData({
  //       thumbnail_image: post.thumbnail_image || "",
  //       author: post.author,
  //       category: post.category || "",
  //       title: post.title || "",
  //       introduction: post.introduction || "",
  //       content: post.content || "",
  //     });
  //   }
  // }, [post, categories]);

  console.log("Form data:", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailSelect = (url) => {
    setFormData((prev) => ({ ...prev, thumbnail_image: url }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  // console.log("post data", post);
  // if (loading) return <LoadingScreen/>;
  // if (!post) return <NotFoundPage/>;

  return (
    <div className="flex h-screen">
      <AdminPanel />

      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit article</h2>
          <div className="space-x-2">
            <Button className="px-8 py-2 rounded-full" variant="outline">
              Save as draft
            </Button>
            <Button
              className="px-8 py-2 rounded-full bg-black text-white"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>

        <form className="space-y-7 max-w-4xl">
          {/* Thumbnail */}
          <ThumbnailUploader
            initialValue={post.thumbnail_image}
            onFileSelect={(url) =>
              setFormData((prev) => ({ ...prev, thumbnail_image: url }))
            }
          />

          {/* Category */}
          <div>
            <label>Category: {formData.category}</label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                // Find the category object to get both name and id if needed
                const selectedCategory = categories?.find(
                  (cat) => cat.name === value
                );
                setFormData((prev) => ({ ...prev, category: value }));
              }}
            >
              <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
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
          </div>

          {/* Author */}
          <div>
            <label>Author name</label>
            <Input
              defaultValue={post.author}
              className="mt-1 max-w-lg"
              disabled
            />
          </div>

          {/* Title */}
          <div>
            <label>Title</label>
            <Input
              value={formData.title}
              name="title"
              placeholder="Article title"
              onChange={handleChange}
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>

          {/* Introduction */}
          <div>
            <label>Introduction (max 120 letters)</label>
            <Textarea
              name="introduction"
              value={formData.introduction}
              placeholder="Introduction"
              onChange={handleChange}
              rows={3}
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              maxLength={120}
            />
          </div>

          {/* Content */}
          <div>
            <label>Content</label>
            <Textarea
              name="content"
              value={formData.content}
              placeholder="Content"
              onChange={handleChange}
              rows={20}
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
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

export default AdminEditArticle;
