import AdminPanel from "@/components/article-management/AdminPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Import Sonner for toast notifications
import { toast, Toaster } from "sonner";

const AdminEditCategory = () => {
  const { categoryId } = useParams();
  const categoryNameInputRef = useRef();
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1️⃣ Fetch category on mount
  useEffect(() => {
    const fetchCategoryById = async (id) => {
      try {
        const response = await axios.get(
          `https://orathai-personal-blog-backend.vercel.app/category/${id}`
        );
        setCategoryName(response.data.name);
        setLoading(false);
      } catch (err) {
        console.error("Fetch category failed:", err);
        setLoading(false);
        toast.error("Failed to fetch category.");
      }
    };

    fetchCategoryById(categoryId);
  }, [categoryId]);

  // 2️⃣ Update category
  const handleUpdateCategoryName = async () => {
    const name = categoryNameInputRef.current?.value;
    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      await axios.put(
        `https://orathai-personal-blog-backend.vercel.app/category/${categoryId}`,
        { name }
      );
      toast.success("Category updated successfully!"); // ✅ toast instead of alert
      setCategoryName(name); // update state after success
      navigate("/admin/category-management");
    } catch (err) {
      console.error("Edit Category failed:", err);
      toast.error("Failed to update category. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <AdminPanel />

      {/* Main Edit Category Section */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Category</h2>
          <Button
            className="px-8 py-2 rounded-full bg-black text-white"
            onClick={handleUpdateCategoryName}
          >
            Save
          </Button>
        </div>
        <div className="space-y-7 max-w-md">
          <div className="relative">
            <label
              htmlFor="category-name"
              className="block text-sm font-medium text-gray-500 mb-1"
            >
              Category Name
            </label>
            <Input
              id="category-name"
              type="text"
              ref={categoryNameInputRef}
              placeholder="Category name"
              className="mt-3 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground border-gray-300"
              defaultValue={categoryName}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEditCategory;
