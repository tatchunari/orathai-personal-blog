import { Router } from "express";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const profileRouter = Router();

/**
 * READ single user profile by id
 */
profileRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "Profile not found" });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
export default profileRouter;

/**
 * UPDATE profile
 */
profileRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, bio, username, email, avatar_url } = req.body;

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ name, bio, avatar_url })
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "Profile not found" });

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
