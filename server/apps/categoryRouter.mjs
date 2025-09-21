import { Router } from "express";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const categoryRouter = Router();

/**
 * CREATE category
 */
categoryRouter.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });

    return res.status(201).json({
      message: "Category created successfully",
      category: data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * READ all categories
 */
categoryRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * READ category by id
 */
categoryRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "Category not found" });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * UPDATE category
 */
categoryRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const { data, error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "Category not found" });

    return res.status(200).json({
      message: "Category updated successfully",
      category: data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE category
 */
categoryRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default categoryRouter;
