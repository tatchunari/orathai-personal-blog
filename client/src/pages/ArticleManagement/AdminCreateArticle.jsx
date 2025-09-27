import AdminPanel from "@/components/ArticleManagement/AdminPanel"

import { useState } from "react";
import axios from "axios";

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
import { CiImageOn } from "react-icons/ci";
import LoadingScreen from "../LoadingScreen";

const AdminCreateArticle = () => {


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [postForm, setPostForm] = useState({
    category: "",
    author: "",
    title: "",
    introduction: "",
    content: "",
    thumbnail_image: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCategoryChange = (value) => {
  setPostForm(prev => ({ ...prev, category: value }));
};

// console.log("Form", postForm);


  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const payload = {
      author: postForm.author,
      title: postForm.title,
      introduction: postForm.introduction,
      content: postForm.content,
      category: postForm.category,
      thumbnail_image: postForm.thumbnail_image || null, // optional
    };

    console.log("Submitting post:", payload);

    await axios.post(
      "https://orathai-personal-blog-backend.vercel.app/posts",
      payload, 
      { headers: { "Content-Type": "application/json" } }
    );

    alert("Add posts successfully!");
  } catch (error) {
    setError(error.message);
    console.log("Errors: ", error.response?.data || error.message);
  } finally {
    setIsLoading(false);
  }
};


  if (isLoading) {
    return <LoadingScreen/>
  }

  return (
    <div className="flex h-screen">
      <AdminPanel/>

      {/* Main Create Aricle Section */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create article</h2>
          <div className="space-x-2">
            <Button className="px-8 py-2 rounded-full" variant="outline">
              Save as draft
            </Button>
            <Button onClick={handleSubmit} className="px-8 py-2 rounded-full bg-black text-white">Save and publish</Button>
          </div>
        </div>

        <form className="space-y-7 max-w-4xl">
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-gray-700 font-medium mb-2"
            >
              Thumbnail image
            </label>
            <div className="flex items-end space-x-4">
              <div className="flex justify-center items-center w-full max-w-lg h-64 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
                <div className="text-center space-y-2">
                  <CiImageOn className="mx-auto h-8 w-8 text-gray-400" />
                </div>
              </div>
              <label
                htmlFor="file-upload"
                className="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
              >
                <span>Upload thumbnail image</span>
                <input
                  type="text"
                  name="thumbnail_image"
                  placeholder="Thumbnail URL"
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <Select name="category" onValueChange={handleCategoryChange}>
              <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="inspiration">Inspiration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="author">Author name</label>
            <Input
              name="author"
              className="mt-1 max-w-lg"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleInputChange}
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>

          <div>
            <label htmlFor="introduction">Introduction (max 120 letters)</label>
            <Textarea
              type="text"
              name="introduction"
              placeholder="Introduction"
              onChange={handleInputChange}
              rows={3}
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              maxLength={120}
            />
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <Textarea
              name="content"
              placeholder="Content"
              rows={20}
              onChange={handleInputChange}
              className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
        </form>
        </main>
    </div>
  )
}

export default AdminCreateArticle