import axios from "axios";
import { useState, useEffect } from "react";

export function useQuery(endpoint) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(`call usePostsData....`)

  useEffect(() => {
    const fetchData = async () => {
      // console.log(`fetch usePostsData....`);
      try {
        const response = await axios.get(`https://orathai-personal-blog-backend.vercel.app/${endpoint}`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
}
