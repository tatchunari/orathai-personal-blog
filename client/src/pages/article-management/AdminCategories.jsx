import AdminPanel from "@/components/article-management/AdminPanel";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

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

import { useNavigate } from "react-router-dom";
import { useCategoryData } from "@/hooks/useCategoryData";
import axios from "axios";
import { useQuery } from "@/hooks/useQuery";

const AdminCategories = () => {
  // console.log('render AdminCategories...');

  const { data, loading } = useQuery("category");

  const navigate = useNavigate();

  // Delete Category
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://orathai-personal-blog-backend.vercel.app/category/${id}`
      );
      // Optionally re-fetch data or filter locally
      window.location.reload(); // quick way, but better to refetch
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminPanel />

      {/* Main Category Section */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Category management</h2>
          <Button
            className="px-8 py-2 rounded-full bg-black text-white"
            onClick={() => navigate("/admin/category-management/create")}
          >
            <LuPencil className="mr-2 h-4 w-4" /> Create category
          </Button>
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
          />
        </div>

        {loading && <div>Loading...</div>}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Category</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-right flex">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      navigate(`/admin/category-management/edit/${category.id}`)
                    }
                  >
                    <LuPencil className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm("Are you sure?")) {
                        handleDelete(category.id);
                      }
                    }}
                  >
                    <FaRegTrashAlt className="h-4 w-4 hover:text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
};

export default AdminCategories;
