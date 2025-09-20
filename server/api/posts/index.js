import pool from '../../utils/db.js';
import { validatePostData } from '../../middleware/postValidation.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { category = '', keyword = '', page = 1, limit = 6 } = req.query;
      const safePage = Math.max(1, Number(page));
      const safeLimit = Math.max(1, Math.min(100, Number(limit)));
      const offset = (safePage - 1) * safeLimit;

      let query = `
        SELECT posts.id, posts.image, categories.name AS category, posts.title,
               posts.description, posts.date, posts.content, statuses.status, posts.likes_count
        FROM posts
        INNER JOIN categories ON posts.category_id = categories.id
        INNER JOIN statuses ON posts.status_id = statuses.id
      `;
      let values = [];

      if (category && keyword) {
        query += ` WHERE categories.name ILIKE $1 AND 
                   (posts.title ILIKE $2 OR posts.description ILIKE $2 OR posts.content ILIKE $2)`;
        values = [`%${category}%`, `%${keyword}%`];
      } else if (category) {
        query += " WHERE categories.name ILIKE $1";
        values = [`%${category}%`];
      } else if (keyword) {
        query += ` WHERE posts.title ILIKE $1 OR posts.description ILIKE $1 OR posts.content ILIKE $1`;
        values = [`%${keyword}%`];
      }

      query += ` ORDER BY posts.date DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
      values.push(safeLimit, offset);

      const result = await pool.query(query, values);

      // Count total posts
      let countQuery = `
        SELECT COUNT(*) FROM posts
        INNER JOIN categories ON posts.category_id = categories.id
        INNER JOIN statuses ON posts.status_id = statuses.id
      `;
      let countValues = values.slice(0, -2);

      if (category && keyword) {
        countQuery += ` WHERE categories.name ILIKE $1 AND (posts.title ILIKE $2 OR posts.description ILIKE $2 OR posts.content ILIKE $2)`;
      } else if (category) {
        countQuery += " WHERE categories.name ILIKE $1";
      } else if (keyword) {
        countQuery += ` WHERE posts.title ILIKE $1 OR posts.description ILIKE $1 OR posts.content ILIKE $1`;
      }

      const countResult = await pool.query(countQuery, countValues);
      const totalPosts = parseInt(countResult.rows[0].count, 10);

      const results = {
        totalPosts,
        totalPages: Math.ceil(totalPosts / safeLimit),
        currentPage: safePage,
        limit: safeLimit,
        posts: result.rows,
        nextPage: offset + safeLimit < totalPosts ? safePage + 1 : null,
        previousPage: offset > 0 ? safePage - 1 : null,
      };

      return res.status(200).json(results);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database query failed' });
    }
  }

  if (req.method === 'POST') {
    const error = validatePostData(req);
    if (error) return res.status(400).json({ message: error });

    const { title, image, category_id, description, content, status_id } = req.body;

    try {
      const query = `
        INSERT INTO posts (title, image, category_id, description, content, status_id)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const values = [title, image, category_id, description, content, status_id];
      await pool.query(query, values);
      return res.status(201).json({ message: 'Created post successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database insertion failed' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
