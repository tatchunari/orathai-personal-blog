// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  // ตรงนี้ต้องเปลี่ยน connectionString เป็นของตัวเองด้วยนะ
  connectionString:
    "postgresql://postgres:postgres12345@localhost:5432/personal-blog",
});

export default connectionPool;