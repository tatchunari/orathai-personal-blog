import axios from "axios";
import { useState, useEffect } from "react";

export function useCategoryData() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://orathai-personal-blog-backend.vercel.app/api/category");
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, loading };
}
