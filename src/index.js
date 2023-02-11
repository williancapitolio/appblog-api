import dotenv from "dotenv";
dotenv.config();

import express from "express";

import postsRoute from "./routes/posts.route.js";

const port = process.env.PORT || 8800;
const app = express();

app.use(express.json());
app.use("/api/posts", postsRoute);

app.listen(port, () => console.log(`Connected on port ${port}`));
