import { Router } from "express";
import { readAll } from "../controllers/postsController.js";

const router = Router();

router.get("/", readAll);

export default router;
