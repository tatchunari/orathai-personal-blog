import { createClient } from "@supabase/supabase-js";
import pool from "../utils/db.js"; // your connectionPool equivalent

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, username, name } = req.body;

  try {
    // Sign up user in Supabase
    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (supabaseError) {
      return res.status(400).json({ error: "Failed to create user" });
    }

    const supabaseUserId = data.user.id;

    // Insert user into Postgres
    const query = `
      INSERT INTO users (id, username, name, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [supabaseUserId, username, name, "user"];

    const { rows } = await pool.query(query, values);

    return res.status(201).json({
      message: "User created successfully",
      user: rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
