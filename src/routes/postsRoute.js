import { Router } from "express";
import { readAllPosts, readOnePost, createPost, deletePost, updatePost } from "../controllers/postsController.js";

const router = Router();

router.get("/", readAllPosts);
router.get("/:id", readOnePost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.update("/:id", updatePost);

export default router;
