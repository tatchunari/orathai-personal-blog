import AdminPanel from "@/components/article-management/AdminPanel";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminCreateCategory = () => {
  const categoryNameInputRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const name = categoryNameInputRef.current?.value;

    // Basic validations
    if (!name) {
      setError("Category name is required.");
      return;
    }
    if (name.length > 30) {
      setError("Category name must be no longer than 30 characters");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(
        `https://orathai-personal-blog-backend.vercel.app/category`,
        { name }
      );
      toast.success("Category created successfully!");
      navigate("/admin/category-management");
    } catch (err) {
      console.error("Add Category failed:", err);
      setError("Failed to create category. Please try again.");
      toast.error("Failed to create category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminPanel />

      {/* Main Create Category Section */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create Category</h2>
          <Button
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
            className="px-8 py-2 rounded-full bg-black text-white disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>

        <div className="space-y-7 max-w-md">
          <div className="relative">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name
            </label>
            <Input
              id="category"
              type="text"
              ref={categoryNameInputRef}
              placeholder="Category name"
              onChange={() => setError("")}
              className="mt-3 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminCreateCategory;
