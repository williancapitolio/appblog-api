import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: "appblog"
});
