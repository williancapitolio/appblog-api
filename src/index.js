import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute.js";
import postsRoute from "./routes/postsRoute.js";

import { upload, uploadImgMiddleware } from "./config/multer.js";

const port = process.env.PORT || 8800;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.post("/api/upload", upload, uploadImgMiddleware);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(port, () => console.log(`Connected on port ${port}`));
