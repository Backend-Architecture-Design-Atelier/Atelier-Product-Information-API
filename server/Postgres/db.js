const { Pool, Client } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.DEFAULTPORT, // 3000 is seperate from the postgres port
});

pool.connect();

module.exports = pool;

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
// });

// const client = new Client({
//   user: process.env.USERNAME,
//   host: process.env.HOST,
//   database: process.env.DB_NAME,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// });

// client.connect();

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });