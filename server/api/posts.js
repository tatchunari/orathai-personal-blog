import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY 
);

export default async function handler(req, res) {
    console.log("D JAAAAAAAAA")
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
    const numericId = parseInt(id, 10);

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', numericId)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Post not found' });
    return res.status(200).json(data);
  }

  // fallback: all posts
  const { data, error } = await supabase.from('posts').select('*');
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}


  // 4️⃣ Handle POST
  if (req.method === 'POST') {
    const { title, content, category_id, thumbnail_image } = req.body;

    const { data, error } = await supabase.from('posts').insert([
      { title, content, category_id, thumbnail_image },
    ]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
}

