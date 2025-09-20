import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // secret key for backend
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

  // 3️⃣ Handle GET
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) return res.status(500).json({ error: error.message });
      if (!data) return res.status(404).json({ error: 'Profile not found' });
      return res.status(200).json(data);
    }

    // fallback: return all profiles
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // 4️⃣ Handle POST
  if (req.method === 'POST') {
    const { id, name, username, role, avatar_url, bio } = req.body;

    const { data, error } = await supabase.from('profiles').insert([
      { id, name, username, role, avatar_url, bio },
    ]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
}
