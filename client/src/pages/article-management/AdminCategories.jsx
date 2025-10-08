import AdminPanel from "@/components/article-management/AdminPanel";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@/hooks/useQuery";
import { useState, useMemo } from "react";
import LoadingScreen from "../LoadingScreen";
import { InlineLoadingScreen } from "@/components/sub-components/InlineLoadingScreen";

const AdminCategories = () => {
  const { data, loading } = useQuery("category");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Alert Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Filter categories based on search input
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return data;
    return data?.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  // Open delete confirmation dialog
  const confirmDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  // Delete Category
  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await axios.delete(
        `https://orathai-personal-blog-backend.vercel.app/category/${categoryToDelete.id}`
      );
      toast.success("Category deleted successfully!");
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete category. Please try again.");
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminPanel />

      {/* Main Category Section */}
      <main className="flex-1 p-8 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <InlineLoadingScreen />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Category management</h2>
              <button
                className="px-10 flex py-4 items-center rounded-full bg-black text-white"
                onClick={() => navigate("/admin/category-management/create")}
              >
                <LuPencil className="mr-2 h-4 w-4" /> Create category
              </button>
            </div>

            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md py-3 rounded-sm placeholder:text-muted-foreground border-gray-300"
              />
            </div>

            <Table className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <TableHeader className="bg-[#F9F8F6]">
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-[#43403B] w-full">
                    Category
                  </TableHead>
                  <TableHead className="w-[50%] text-gray-500"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories?.map((category, index) => (
                  <TableRow
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-[#F9F8F6]" : "bg-[#EFEEEB]"
                    }`}
                  >
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-right flex">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/admin/category-management/edit/${category.id}`
                          )
                        }
                      >
                        <LuPencil className="h-4 w-4 hover:text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => confirmDelete(category)}
                      >
                        <FaRegTrashAlt className="h-4 w-4 hover:text-muted-foreground" />
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
              category "{categoryToDelete?.name}".
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

export default AdminCategories;
