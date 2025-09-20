import { Router } from "express";
import validatePostData from "../middleware/postValidation.mjs";
import connectionPool from "../utils/db.mjs";

const postRouter = Router();

// User can create new post
postRouter.post("/",validatePostData, async (req, res) => {

  const newPost = req.body;
  try {
    const query = `INSERT INTO posts (title, image, category_id, description, content, status_id)
    values ($1, $2, $3, $4, $5, $6)`;

    const values = [
      newPost.title,
      newPost.image,
      newPost.category_id,
      newPost.description,
      newPost.content,
      newPost.status_id,
    ];

    await connectionPool.query(query, values);
  } catch (e) {
    return res.status(500).json({
      message: e.message,

    });
  }

  return res.status(201).json({ message: "Created post successfully" });
});

// User can view all posts
postRouter.get("/", async (req, res) => {

  try {
    const category = req.query.category || "";
    const keyword = req.query.keyword || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(100, limit));
    const offset = (safePage - 1) * safeLimit;

    let query = `
      SELECT posts.id, posts.image, categories.name AS category, posts.title, posts.description, posts.date, posts.content, statuses.status, posts.likes_count
      FROM posts
      INNER JOIN categories ON posts.category_id = categories.id
      INNER JOIN statuses ON posts.status_id = statuses.id
    `;
    let values = [];

    if (category && keyword) {
      query += `
        WHERE categories.name ILIKE $1 
        AND (posts.title ILIKE $2 OR posts.description ILIKE $2 OR posts.content ILIKE $2)
      `;
      values = [`%${category}%`, `%${keyword}%`];
    } else if (category) {
      query += " WHERE categories.name ILIKE $1";
      values = [`%${category}%`];
    } else if (keyword) {
      query += `
        WHERE posts.title ILIKE $1 
        OR posts.description ILIKE $1 
        OR posts.content ILIKE $1
      `;
      values = [`%${keyword}%`];
    }

    // Order by date
    query += ` ORDER BY posts.date DESC LIMIT $${values.length + 1} OFFSET $${
      values.length + 2
    }`;

    values.push(safeLimit, offset);

    // Execute the main query
    const result = await connectionPool.query(query, values);

   
    let countQuery = `
      SELECT COUNT(*)
      FROM posts
      INNER JOIN categories ON posts.category_id = categories.id
      INNER JOIN statuses ON posts.status_id = statuses.id
    `;
    let countValues = values.slice(0, -2); // delete LIMIT and offset

    if (category && keyword) {
      countQuery += `
        WHERE categories.name ILIKE $1 
        AND (posts.title ILIKE $2 OR posts.description ILIKE $2 OR posts.content ILIKE $2)
      `;
    } else if (category) {
      countQuery += " WHERE categories.name ILIKE $1";
    } else if (keyword) {
      countQuery += `
        WHERE posts.title ILIKE $1 
        OR posts.description ILIKE $1 
        OR posts.content ILIKE $1
      `;
    }

    const countResult = await connectionPool.query(countQuery, countValues);
    const totalPosts = parseInt(countResult.rows[0].count, 10);

    // Respibse for pagination
    const results = {
      totalPosts,
      totalPages: Math.ceil(totalPosts / safeLimit),
      currentPage: safePage,
      limit: safeLimit,
      posts: result.rows,
    };
    // Check for next page
    if (offset + safeLimit < totalPosts) {
      results.nextPage = safePage + 1;
    }
    // Check for previous page
    if (offset > 0) {
      results.previousPage = safePage - 1;
    }
    // Return success response to client
    return res.status(200).json(results);
  } catch (e) {
    console.log("Error get posts:", e.message)
    return res.status(500).json({
            message: e.message,
    });
  }
});

// User can view post by Id
postRouter.get("/:postId", async (req, res) => {
  const postIdFromClient = req.params.postId;

  try {
    const results = await connectionPool.query(
      `
      SELECT posts.id, posts.image, categories.name AS category, posts.title, posts.description, posts.date, posts.content, statuses.status, posts.likes_count
      FROM posts
      INNER JOIN categories ON posts.category_id = categories.id
      INNER JOIN statuses ON posts.status_id = statuses.id
      WHERE posts.id = $1
      `,
      [postIdFromClient]
    );

    // Condition for null/undefined
    if (!results.rows[0]) {
      return res.status(404).json({
        message: `Server could not find a requested post (post id: ${postIdFromClient})`,
      });
    }

    return res.status(200).json({
      data: results.rows[0],
    });
  } catch {
    return res.status(500).json({
      message: `Server could not read post because database issue`,
    });
  }
});


// User can edit post by Id
postRouter.put("/:postId",validatePostData, async (req, res) => {
  
  const postIdFromClient = req.params.postId;
  const updatedPost = { ...req.body, date: new Date() };

  try {
    await connectionPool.query(
      `
        UPDATE posts
        SET title = $2,
            image = $3,
            category_id = $4,
            description = $5,
            content = $6,
            status_id = $7,
            date = $8
        WHERE id = $1
      `,
      [
        postIdFromClient,
        updatedPost.title,
        updatedPost.image,
        updatedPost.category_id,
        updatedPost.description,
        updatedPost.content,
        updatedPost.status_id,
        updatedPost.date,
      ]
    );

    return res.status(200).json({
      message: "Updated post successfully",
    });
  } catch {
    return res.status(500).json({
      message: `Server could not update post because database connection`,
    });
  }
});


// User can delete post
postRouter.delete("/:postId", async (req, res) => {

  const postIdFromClient = req.params.postId;

  try {
    await connectionPool.query(
      `DELETE FROM posts
       WHERE id = $1`,
      [postIdFromClient]
    );

    return res.status(200).json({
      message: "Deleted post successfully",
    });
  } catch {
    return res.status(500).json({
      message: `Server could not delete post because database connection`,
    });
  }
});


export default postRouter;