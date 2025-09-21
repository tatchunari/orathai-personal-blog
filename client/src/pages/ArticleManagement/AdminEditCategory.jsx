import AdminPanel from '@/components/ArticleManagement/AdminPanel'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
 
import { useState } from 'react'

const AdminEditCategory = () => {

const [inputValue, setInputValue] = useState("");

  const handleChange = (key, value) => {
    setFormValue((prev) => ({...prev, [key]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formValue)
    console.log(formValue);
  }

  return (
    <div className='flex h-screen'>
      <AdminPanel/>

      {/* Main Edit Category Section */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Category</h2>
          <Button className="px-8 py-2 rounded-full bg-black text-white">Save</Button>
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
              type="password"
              placeholder="Category name"
              className="mt-3 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminEditCategory