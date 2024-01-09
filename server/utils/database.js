const mysql = require("mysql2");

let pool = mysql.createPool({
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: process.env.DB_PORT,
});

module.exports = pool.promise();
