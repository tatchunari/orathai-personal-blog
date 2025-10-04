import axios from "axios";
import { useState, useEffect } from "react";

const API_BASE = "https://orathai-personal-blog-backend.vercel.app";

export function useQuery(endpoint, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  if (!endpoint || endpoint.includes("undefined")) {
    setLoading(false); 
    return;
  }

  let cancelled = false;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE}/${endpoint}`);
      if (!cancelled) setData(response.data);
    } catch (err) {
      if (!cancelled) {
        console.error("Error fetching:", err);
        setError(err.message || "Something went wrong");
      }
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  fetchData();

  return () => {
    cancelled = true;
  };
}, deps);



  return { data, loading, error };
}
