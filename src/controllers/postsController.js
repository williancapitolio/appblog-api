import { db } from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const readAllPosts = (req, res) => {
    try {
        const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";
        db.query(q, [req.query.cat], (err, data) => {
            if (err) return res.status(400).json(err);
            return res.status(200).json(data);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    };
};

export const readOnePost = (req, res) => {
    try {
        const q = "SELECT `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?";
        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(400).json(err);
            return res.status(200).json(data[0]);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    };
};

export const createPost = (req, res) => {
    try {
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    };
};

export const deletePost = (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json("Not authenticated!");
        jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid!");
            const postId = req.params.id;
            const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
            db.query(q, [postId, userInfo.id], (err, data) => {
                if (err) return res.status(403).json("You can delete only your post!");
                return res.status(200).json("Post has been deleted!")
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    };
};

export const updatePost = (req, res) => {
    try {
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    };
};
