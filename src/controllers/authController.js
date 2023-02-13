import { db } from "../database/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = (req, res) => {
    try {
        //CHECK IF USERS EXISTS
        const q = "SELECT * FROM users WHERE email = ? OR username = ?";
        db.query(q, [req.body.email, req.body.username], (err, data) => {
            if (err) return res.status(400).json(err);
            if (data.length) return res.status(409).json("User already exists!");
            //HASH THE PASSWORD
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            //CREATE A USER
            const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
            const values = [req.body.username, req.body.email, hash];
            db.query(q, [values], (err, data) => {
                if (err) return res.status(400).json(err);
                return res.status(201).json("User created successfully!");
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    };
};

export const login = (req, res) => {
    try {
        //CHECK USERS
        const q = "SELECT * FROM users WHERE username = ?"
        db.query(q, [req.body.username], (err, data) => {
            if (err) return res.status(400).json(err);
            if (data.length === 0) return res.status(404).json("User not found!");
            //CHECK PASSWORD
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
            if (!isPasswordCorrect) return res.status(400).json("Wrong username or password");
            const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
            const { password, ...other } = data[0];
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(other);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    };
};

export const logout = (req, res) => {
    try {
        res.clearCookie("access_token", { sameSite: "none", secure: true }).status(200).json("User has been logged out.");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    };
};
