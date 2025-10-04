import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useQuery } from "@/hooks/useQuery";
import LoadingScreen from "../LoadingScreen";
import NotFoundPage from "../NotFoundPage";
import { EditArticleForm } from "@/components/article-management/EditArticleForm";

const AdminEditArticle = () => {
  const { id } = useParams();
  const { data: post, loading } = useQuery(`posts/${id}`, [id]);
  const { data: categories } = useQuery("category");

  const navigate = useNavigate();

  const API_BASE = "https://orathai-personal-blog-backend.vercel.app";
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.put(`${API_BASE}/posts/${id}`, formData);
      if (response.status === 200) {
        alert("Post updated successfully!");
        navigate("/admin");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update post.");
    }
  };

  if (loading) return <LoadingScreen />;
  if (!post) return <NotFoundPage />;

  if (post && categories) {
    return (
      <EditArticleForm
        post={post}
        categories={categories}
        onSubmit={handleSubmit}
      />
    );
  }

  return <div>Data not ready</div>;
};

export default AdminEditArticle;
