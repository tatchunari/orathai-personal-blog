import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  const { oldPassword, newPassword } = req.body;

  if (!token) return res.status(401).json({ error: "Unauthorized: Token missing" });
  if (!newPassword) return res.status(400).json({ error: "New password is required" });

  try {
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError) return res.status(401).json({ error: "Unauthorized: Invalid token" });

    // Verify old password
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: userData.user.email,
      password: oldPassword,
    });

    if (loginError) return res.status(400).json({ error: "Invalid old password" });

    // Update password
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      message: "Password updated successfully",
      user: data.user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
