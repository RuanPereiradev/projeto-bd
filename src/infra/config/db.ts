import mysql from "mysql2/promise"
export const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3309,
    user: "root",
    password: "root",
    database: "equipe422707",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});