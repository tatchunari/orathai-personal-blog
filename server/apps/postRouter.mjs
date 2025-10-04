import { Router } from "express";
import validatePostData from "../middleware/postValidation.mjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const postRouter = Router();

/**
 * CREATE new post
 */
postRouter.post("/", validatePostData, async (req, res) => {
  const newPost = req.body;

  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Missing auth token" });

    // Retrieve user info from Supabase
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Include the user's ID in the post
    const postWithUser = { ...newPost, user_id: user.id };

    const { data, error } = await supabase
      .from("posts")
      .insert([postWithUser])
      .select()
      .single();

    if (error) return res.status(500).json({ message: error.message });

    return res.status(201).json({
      message: "Created post successfully",
      post: data,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/**
 * READ all posts
 */
postRouter.post("/", validatePostData, async (req, res) => {
  const newPost = req.body;
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Missing auth token" });

    // Retrieve user info from Supabase
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Include the user's ID in the post
    const postWithUser = { ...newPost, user_id: user.id };

    const { data, error } = await supabase
      .from("posts")
      .insert([postWithUser])
      .select(
        `
        *,
        profiles:user_id (
          id,
          name,
          avatar_url
        )
      `
      )
      .single();

    if (error) return res.status(500).json({ message: error.message });

    return res.status(201).json({
      message: "Created post successfully",
      post: data,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/**
 * READ post by id
 */
postRouter.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    // Join posts with profile table
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        profile:user_id (
          id,
          name,
          bio
        )
      `
      )
      .eq("id", postId)
      .single();

    if (error) return res.status(500).json({ message: error.message });
    if (!data)
      return res
        .status(404)
        .json({ message: `Post with id ${postId} not found` });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/**
 * UPDATE post by id
 */
postRouter.put("/:postId", validatePostData, async (req, res) => {
  const { postId } = req.params;
  const updatedPost = { ...req.body, updated_at: new Date() };

  try {
    const { data, error } = await supabase
      .from("posts")
      .update(updatedPost)
      .eq("id", postId)
      .select()
      .single();

    if (error) return res.status(500).json({ message: error.message });
    if (!data)
      return res
        .status(404)
        .json({ message: `Post with id ${postId} not found` });

    return res.status(200).json({
      message: "Updated post successfully",
      post: data,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/**
 * DELETE post by id
 */
postRouter.delete("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) return res.status(500).json({ message: error.message });

    return res.status(200).json({
      message: "Deleted post successfully",
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

export default postRouter;
