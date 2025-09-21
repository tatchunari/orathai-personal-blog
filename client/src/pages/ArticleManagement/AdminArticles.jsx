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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import { useState } from "react";
import { usePostsData } from "@/hooks/usePostsData";
import { useNavigate, useParams } from "react-router-dom";
import AdminPanel from "@/components/ArticleManagement/AdminPanel";

const AdminArticles = ({ onNavigate }) => {  
  console.log(`render AdminArticles....`)

  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const {posts, loading} = usePostsData();
  const [search, setSearch] = useState("");
  // Remove the navigate hook since we'll use onNavigate prop
  const navigate = useNavigate();

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
      await axios.delete(`https://orathai-personal-blog-backend.vercel.app/posts/${id}`);
      // Optionally re-fetch data or filter locally
      window.location.reload(); // quick way, but better to refetch
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminPanel/>

      {/* Main Article Table Section */}
    <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Article management</h2>
          <Button
            className="font-normal px-8 py-2 rounded-full bg-black text-white"
            onClick={() => navigate("/admin/article-management/create")}
          >
            <LuPencil className="mr-2 h-4 w-4" /> Create article
          </Button>
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search..."
              className="w-full py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
          <Select>
            <SelectTrigger className="w-[180px] py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px] py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="inspiration">Inspiration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Article title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {post.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/article-management/edit/${post.id}`)}>
                    <LuPencil className="h-4 w-4 hover:text-muted-foreground cursor-pointer" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => {
                    if(confirm("Are you sure?")) {
                      handleDelete(post.id)
                    }
                  }}>
                    <FaRegTrashAlt className="h-4 w-4 cursor-pointer hover:text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      </div>
  )
}

export default AdminArticles