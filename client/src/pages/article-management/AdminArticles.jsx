// Article Management
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InlineLoadingScreen } from "@/components/sub-components/InlineLoadingScreen";

import axios from "axios";

import { useState } from "react";
import { usePostsData } from "@/hooks/usePostsData";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@/hooks/useQuery";
import AdminPanel from "@/components/article-management/AdminPanel";

const AdminArticles = () => {
  console.log(`render AdminArticles....`);

  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const { data: categories } = useQuery("category");

  const { posts, loading } = usePostsData();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Alert Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // Filter Logic
  const filteredArticles = posts.filter((article) => {
    return (
      article.title.toLowerCase().includes(search.toLowerCase()) &&
      (status ? article.status === status : true) &&
      (category ? article.category === category : true)
    );
  });

  // Open delete confirmation dialog
  const confirmDelete = (post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  // Delete handler
  const handleDelete = async () => {
    if (!postToDelete) return;

    try {
      await axios.delete(
        `https://orathai-personal-blog-backend.vercel.app/posts/${postToDelete.id}`
      );
      toast.success("Article deleted successfully!");
      setDeleteDialogOpen(false);
      setPostToDelete(null);
      window.location.reload(); // Consider using a refetch method instead
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete article. Please try again.");
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminPanel />

      {/* Main Article Table Section */}
      <main className="flex-1 p-8 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <InlineLoadingScreen />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Article management</h2>
              <button
                className="font-normal flex text-sm px-10 py-4 rounded-full bg-black text-white"
                onClick={() => navigate("/admin/article-management/create")}
              >
                <LuPencil className="mr-2 h-4 w-4" /> Create article
              </button>
            </div>

            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground border-gray-300"
                />
              </div>
              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger className="w-[180px] py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground border-gray-300">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger className="w-[180px] py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground border-gray-300">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Table className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <TableHeader className="bg-[#F9F8F6]">
                <TableRow className="border-b border-gray-200">
                  <TableHead className="w-[50%] text-gray-500">
                    Article title
                  </TableHead>
                  <TableHead className="text-[#43403B]">Category</TableHead>
                  <TableHead className="text-[#43403B]">Status</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((post, index) => (
                  <TableRow
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-[#F9F8F6]" : "bg-[#EFEEEB]"
                    }`}
                  >
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full py-0.5 text-sm font-normal ${
                          post.status === "Published"
                            ? "text-green-500"
                            : "text-gray-500 "
                        }`}
                      >
                        • {post.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          navigate(`/admin/article-management/edit/${post.id}`)
                        }
                      >
                        <LuPencil className="h-4 w-4 hover:text-muted-foreground cursor-pointer" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => confirmDelete(post)}
                      >
                        <FaRegTrashAlt className="h-4 w-4 cursor-pointer hover:text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </main>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              article "{postToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-400 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminArticles;
