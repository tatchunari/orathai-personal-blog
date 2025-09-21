import axios from "axios";
import { useState, useEffect } from "react";

export function usePostsData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://orathai-personal-blog-backend.vercel.app/posts");
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { posts, loading };
}
