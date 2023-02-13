import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import postsRoute from "./routes/postsRoute.js";

const port = process.env.PORT || 8800;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

app.listen(port, () => console.log(`Connected on port ${port}`));
