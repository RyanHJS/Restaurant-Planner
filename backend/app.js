const express = require("express");
const cors = require("cors");
const app = express();

console.log("Starting Server...");

// const db = require("./config/database");
// db.connect((err) => {
//   if (err) {
//     console.error(err);
//     throw err;
//   }
// });

// async function test() {
//   if (db) {
//     console.log("Database connected");
//     await db.query(
//       "CREATE TABLE IF NOT EXISTS recipes (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(60)"
//     );
//   } else {
//     console.log("Database not connected");
//   }
// }

// test();

// const createUnixSocketPool = require("./config/database");
// const createTcpPool = require("./config/connect-tcp");
// const createPool = async () => {
//   const config = {
//     connectionLimit: 5,
//     connectTimeout: 10000, // 10seconds
//     // acquireTimeout: 10000, //
//     waitForConnections: true,
//     queueLimit: 0, // default
//   };
//   if (process.env.INSTANCE_HOST) {
//     console.log("using tcp connection");
//     return createTcpPool(config);
//   } else if (process.env.INSTANCE_UNIX_SOCKET) {
//     console.log("using unix socket connection");

//     return createUnixSocketPool(config);
//   } else {
//     throw "Set either `INSTANCE_HOST` or `INSTANCE_UNIX_SOCKET` environment variables.";
//   }
// };

// const ensureSchema = async (pool) => {
//   console.log("break0");

//   await pool.query(
//     "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50)"
//   );
//   console.log("Ensured that table 'users' exists");
// };

// const createPoolAndEnsureSchema = async () => {
//   await createPool()
//     .then(async (pool) => {
//       await ensureSchema(pool);
//       return pool;
//     })
//     .catch((err) => {
//       console.log("Unable to create pool.");
//       throw err;
//     });
// };

// let pool;

// async function test() {
//   try {
//     pool = await createPool();
//     await pool.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY)");
//     console.log("attempt to create user table");
//   } catch (err) {
//     console.log(err);
//   }
// }
// test();

const mysql = require("mysql2");
// var conn = mysql.createConnection({
//   host: process.env.INSTANCE_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
//   //   socketPath: process.env.INSTANCE_UNIX_SOCKET,
// });

// conn.connect((err) => {
//   if (err) {
//     console.log("Unable to connect to database");
//     // throw err;
//     return;
//   }
//   console.log("Connected to database");
// });

const pool = mysql
  .createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    socketPath: process.env.INSTANCE_UNIX_SOCKET,
  })
  .promise();

async function test() {
  await pool.query("SELECT * FROM recipes");
}

test();

// import router objects
// app.use(async (req, res, next) => {
//   if (pool) {
//     console.log("break1");
//     return next();
//   }
//   try {
//     let pool = await createPoolAndEnsureSchema();
//     console.log("break2");

//     next();
//   } catch (err) {
//     return next(err);
//   }
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use the following routes

// app.get('/', async (req, res, next) => {
//     pool = pool || (await createPoolAndEnsureSchema());
//     try {

//     }
// })

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server listening on ${PORT}`));
