import { Router } from "express";
import { readAll } from "../controllers/posts.controller.js";

const router = Router();

router.get("/", readAll);

export default router;
