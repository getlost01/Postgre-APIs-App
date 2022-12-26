import pg from "pg";
const Pool = pg.Pool;
import * as dotenv from 'dotenv'; 
dotenv.config();

// const pool = new Pool({
//   user: "aagamjain",
//   host: process.env.HOST,
//   database: "Postgre-APIs-App",
//   password: process.env.PASSWORD,
//   port: 5432
// });

var pool = new pg.Client("postgres://aabdqjjm:yu3I155W9E2mXS5EP9kPOddcD0eoGPT2@tiny.db.elephantsql.com/aabdqjjm");

pool.connect((err) => {
  if (err) {
    console.error('Error in connecting to the database:', err.stack);
  } else {
    console.log('Connected to the database 👍');
  }
});

export default pool;