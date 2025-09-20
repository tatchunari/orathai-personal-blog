// Article Management
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState } from "react";
import { usePostsData } from "@/hooks/usePostsData";
// Remove the useNavigate import since we'll use onNavigate prop
// import { useNavigate } from "react-router-dom";

const Articles = ({ onNavigate }) => {  // Make sure onNavigate prop is received

  // State for Dropdown menus
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const {posts, loading} = usePostsData();
  const [search, setSearch] = useState("");
  // Remove the navigate hook since we'll use onNavigate prop
  // const navigate = useNavigate();

  if (loading) return <p>Loading...</p>

  // Filter Logic
  const filteredArticles = posts.filter((article) => {
    return (
      article.title.toLowerCase().includes(search.toLowerCase()) &&
      (status ? article.status === status : true) &&
      (category ? article.category === category : true)
    );
  });

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://blog-post-project-api.vercel.app/posts/${id}`);
      // Optionally re-fetch data or filter locally
      window.location.reload(); // quick way, but better to refetch
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      {/* Top Navbar */}
      <div className="hidden md:flex items-center justify-between space-x-3 border-b-1 border-[#DAD6D1]">
        <h1 className="font-semibold text-xl ml-4 text-[#26231E]">Article Management</h1>
        <button
          className="flex flex-row items-center gap-3 px-10 py-3 my-5 mr-15 rounded-full text-sm font-light text-white bg-[#26231E] hover:bg-gray-100 hover:text-black transition cursor-pointer"
          onClick={() => onNavigate('articles', 'create')}  // Use onNavigate instead of navigate
          >
          <FaPlus />
          Create article
        </button>
      </div>

      <div className="flex flex-row justify-between mt-10 mx-4">
        {/* Search Input */}
        <div className="flex items-center border pl-4 gap-2 border-gray-500/30 h-[42px] rounded-xl overflow-hidden w-full max-w-xs">
            <CiSearch />
            <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..." 
            className="w-full h-full outline-none text-gray-500 bg-transparent placeholder-gray-500 text-sm"/>
        </div>

        {/* Dropdown Selector */}
        <div className="flex flex-row gap-x-4">

          {/* Category */}
          <Select value={category} onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-40 py-5 border border-gray-300 text-[#75716B] text-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cat" className="hover:bg-gray-200 cursor-pointer text-[#75716B]">Cat</SelectItem>
              <SelectItem value="dog" className="hover:bg-gray-200 cursor-pointer text-[#75716B]">Dog</SelectItem>
              <SelectItem value="inspiration" className="hover:bg-gray-200 cursor-pointer text-[#75716B]">Inspiration</SelectItem>
              <SelectItem value="general" className="hover:bg-gray-200 cursor-pointer text-[#75716B]">General</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-40 border py-5 border-[#DAD6D1] text-[#75716B] text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published" className="hover:bg-gray-200 cursor-pointer text-[#75716B]">Published</SelectItem>
              <SelectItem value="draft" className="hover:bg-gray-200 cursor-pointer text-[#75716B]">Draft</SelectItem>
              <SelectItem value="archived" className="hover:bg-gray-200 cursor-pointer text-[#75716B]">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Article Lists */}
      <table className="w-full mt-10 mx-4 border-collapse bg-white rounded-md shadow-sm">
        <thead className="bg-[#F9F8F6] text-left text-gray-600 text-sm">
          <tr>
            <th className="p-3 font-medium">Article title</th>
            <th className="p-3 font-medium">Category</th>
            <th className="p-3 font-medium">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((article) => (
            <tr key={article.id} className="border-b border-[#c9c6bc]">
              <td className="p-3 text-sm text-[#43403B]">{article.title}</td>
              <td className="p-3 text-sm text-[#43403B]">{article.category}</td>
              <td
                className={`p-3 font-medium ${
                  article.status === "Published"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                • {article.status}
              </td>
              <td className="p-3 flex gap-3">
                <button
                  className="text-gray-500 hover:text-blue-500 cursor-pointer"
                  onClick={() => onNavigate('articles', 'edit', { id: article.id })}
                >
                  <LuPencil/>
                </button>
                <button
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={() => handleDelete(article.id)}
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Articles