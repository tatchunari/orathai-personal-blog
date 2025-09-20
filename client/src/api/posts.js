import axios from "axios";

const BASE_URL = "https://orathai-personal-blog-backend.vercel.app/api/posts";

export const fetchPosts = async ({ page = 1, limit = 6, category = "Highlight" }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/posts?page=${page}&limit=${limit}${category !== "Highlight" ? `&category=${category}` : ""}`
    );

    return response.data; 
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; 
  }
};
