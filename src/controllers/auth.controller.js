import { db } from "../database/db.js"
import bcrypt from "bcrypt";

export const register = (req, res) => {
    try {
        //CHECK IF USERS EXISTS
        const q = "SELECT * FROM users WHERE email = ? OR username = ?";
        db.query(q, [req.body.email, req.body.username], (err, data) => {
            if (err) return res.status(400).json(err);
            if (data.length) return res.status(409).json("User already exists!");
            console.log(data)
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

export const login = (req, res) => { };

export const logout = (req, res) => { };
