import { createClient } from '@supabase/supabase-js';

// Connect to Supabase using service role key (backend only!)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

  // 1️⃣ Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // or '*' for all
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2️⃣ Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  try {
    if (req.method === 'GET') {
      // Fetch all categories
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      // Add new category
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: 'Category name is required' });

      const { data, error } = await supabase.from('categories').insert([{ name }]);
      if (error) throw error;
      return res.status(201).json(data);
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err) {
    console.error('Supabase error:', err);
    return res.status(500).json({ error: err.message });
  }
}
