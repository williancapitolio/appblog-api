import { Router } from "express";
import { getAll } from "../controllers/posts.controller.js";

const router = Router();

router.get("/", getAll);

export default router;
