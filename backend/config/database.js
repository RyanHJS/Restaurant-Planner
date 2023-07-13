const mysql = require('mysql2');

require("dotenv").config()


// // For production: cloud run deployment
const prodPool = mysql.createPool({
    socketPath: process.env.INSTANCE_UNIX_SOCKET,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});


// For development only - local
const devPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});


module.exports = process.env.NODE_ENV === "production" ? prodPool.promise() : devPool.promise();