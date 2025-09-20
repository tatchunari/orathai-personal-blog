import pool from '../../utils/db.js';
import { validatePostData } from '../../middleware/postValidation.js';

export default async function handler(req, res) {
  const { postId } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        `SELECT posts.id, posts.image, categories.name AS category, posts.title,
                posts.description, posts.date, posts.content, statuses.status, posts.likes_count
         FROM posts
         INNER JOIN categories ON posts.category_id = categories.id
         INNER JOIN statuses ON posts.status_id = statuses.id
         WHERE posts.id = $1`,
        [postId]
      );
      if (!result.rows[0]) return res.status(404).json({ message: 'Post not found' });
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database query failed' });
    }
  }

  if (req.method === 'PUT') {
    const error = validatePostData(req);
    if (error) return res.status(400).json({ message: error });

    const { title, image, category_id, description, content, status_id } = req.body;
    const updatedDate = new Date();

    try {
      const query = `
        UPDATE posts
        SET title = $2, image = $3, category_id = $4, description = $5,
            content = $6, status_id = $7, date = $8
        WHERE id = $1
      `;
      const values = [postId, title, image, category_id, description, content, status_id, updatedDate];
      await pool.query(query, values);
      return res.status(200).json({ message: 'Updated post successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database update failed' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await pool.query(`DELETE FROM posts WHERE id = $1`, [postId]);
      return res.status(200).json({ message: 'Deleted post successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database deletion failed' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
