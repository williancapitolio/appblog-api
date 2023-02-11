import { db } from "../database/db.js"
import bcrypt, { hashSync } from "bcrypt";

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
        res.status(500).json(err);
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
        });
    } catch (err) {
        res.status(500).json(err);
    };
};

export const logout = (req, res) => { };
