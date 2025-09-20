import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // secret key for backend
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { title, content, category_id, thumbnail_image } = req.body;
    const { data, error } = await supabase.from('posts').insert([
      { title, content, category_id, thumbnail_image },
    ]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
}
