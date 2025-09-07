import axios from "axios";

export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`https://blog-post-project-api.vercel.app/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};
