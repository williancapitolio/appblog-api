import { db } from "../database/db.js";

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
    res.json("This is post route");
};

export const deletePost = (req, res) => {
    res.json("This is post route");
};

export const updatePost = (req, res) => {
    res.json("This is post route");
};
