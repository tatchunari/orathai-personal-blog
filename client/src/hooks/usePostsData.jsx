import axios from "axios";
import { useState, useEffect } from "react";

export function usePostsData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(`call usePostsData....`)

  useEffect(() => {
    const fetchData = async () => {
      // console.log(`fetch usePostsData....`);
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
