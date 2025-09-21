import express from "express";
import cors from "cors";
import postRouter from "./apps/postRouter.mjs";
import authRouter from "./apps/auth.mjs";
import categoryRouter from "./apps/categoryRouter.mjs";
import profileRouter from "./apps/profileRouter.mjs";
import protectUser from "./middleware/protectUser.mjs";
import protectAdmin from "./middleware/protectAdmin.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello TechUp!");
});

app.get("/protected-route", protectUser, (req, res) => {
  res.json({ message: "This is protected content", user: req.user });
});

// ตัวอย่างเส้นทางที่เฉพาะ Admin เท่านั้นที่เข้าถึงได้
app.get("/admin-only", protectAdmin, (req, res) => {
  res.json({ message: "This is admin-only content", admin: req.user });
});

app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/profiles", profileRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
