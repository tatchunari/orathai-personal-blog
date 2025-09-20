import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
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

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Profile not found' });

        return res.status(200).json(data);
      }

      // fallback: return all profiles
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      return res.status(200).json(data);
    }

    // 4️⃣ Handle POST
    if (req.method === 'POST') {
      const { id, name, username, role, avatar_url, bio } = req.body;

      if (!id || !name || !username) {
        return res.status(400).json({ error: 'id, name, and username are required' });
      }

      const { data, error } = await supabase.from('profiles').insert([
        { id, name, username, role: role || 'user', avatar_url, bio }
      ]);

      if (error) throw error;
      return res.status(200).json(data);
    }

    // 5️⃣ Unsupported method
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message });
  }
}
