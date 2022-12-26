import pg from "pg";
const Pool = pg.Pool;
import * as dotenv from 'dotenv'; 
dotenv.config();

// const pool = new Pool({
//   user: "aagamjain",
//   host: "localhost",
//   database: "Postgre-APIs-App",
//   password: process.env.PASSWORD,
//   port: 5432
// });

var pool = new pg.Client(process.env.POSTSQLREMOTE);

pool.connect((err) => {
  if (err) {
    console.error('Error in connecting to the database:', err.stack);
  } else {
    console.log('Connected to the database 👍');
  }
});

export default pool;