import AdminPanel from '@/components/ArticleManagement/AdminPanel'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
 
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const AdminEditCategory = () => {

const { categoryId } = useParams();
const categoryNameInputRef = useRef();

const [categoryName, setCategoryName] = useState("");

useEffect(() => {
  fetchCategoryById(categoryId);
}, [])


// Fetch Category name
const fetchCategoryById = async (id) => {
    try {
      const response = await axios.get(`https://orathai-personal-blog-backend.vercel.app/category/${id}`);
      setCategoryName(response.data.name);
      // setCategoryName(response)
    } catch (err) {
      console.error("Fetch data failed:", err);
    }
  };

  // Update Category name
  const handleUpdateCategoryName = async (id) => {
      const name = categoryNameInputRef.current?.value;
        if (!name) {
          alert("Category name is required");
          return;
        }
        try {
          const response = await axios.put(
            `https://orathai-personal-blog-backend.vercel.app/category/${id}`,
            { name }
          );
          console.log(response)
        } catch (err) {
          console.error("Edit Category failed:", err);
        }
      }



  return (
    <div className='flex h-screen'>
      <AdminPanel/>

      {/* Main Edit Category Section */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Category</h2>
          <Button 
          className="px-8 py-2 rounded-full bg-black text-white"
          onClick={() => handleUpdateCategoryName(categoryId)}
          >Save</Button>
        </div>
        <div className="space-y-7 max-w-md">
          <div className="relative">
            <label
              htmlFor="current-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name
            </label>
            <Input
              id="current-password"
              type="text"
              ref={categoryNameInputRef}
              placeholder="Category name"
              className="mt-3 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              defaultValue={categoryName}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminEditCategory