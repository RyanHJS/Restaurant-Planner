const mysql = require('mysql2');

require("dotenv").config();

// // For development only - local
// const devPool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     connectionLimit: process.env.DB_CONNECTION_LIMIT
// }).promise();

// // For production: cloud run deployment
// const prodPool = mysql.createPool({
//     socketPath: process.env.INSTANCE_UNIX_SOCKET,
//     user: process.env.DB_USER,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     connectionLimit: process.env.DB_CONNECTION_LIMIT
// }).promise();

// const generatePool = async () => {
//     if (process.env.INSTANCE_UNIX_SOCKET && process.env.NODE_ENV == 'production') {
//         return prodPool;
//     }
//     else if (process.env.DB_HOST && process.env.NODE_ENV == 'development') {
//         return devPool;
//     }
//     else {
//         console.log("Please specify a database instantiation type in .env file")
//     }
// }


// module.exports = generatePool;




// For development only - local
const devPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});

// Ryan Test
// const devPool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'secret',
//     database: 'restaurant_planner_app',
//     port: 3307,
//     connectionLimit: process.env.DB_CONNECTION_LIMIT
// });

// module.exports = devPool.promise();