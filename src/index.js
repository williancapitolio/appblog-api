import dotenv from "dotenv";
dotenv.config();

import express from "express";

const port = process.env.PORT || 8800;
const app = express();

app.use(express.json());

app.listen(port, () => console.log(`Connected on port ${port}`));
