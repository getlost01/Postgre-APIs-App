import pg from "pg";
const Pool = pg.Pool;

const pool = new Pool({
  user: "aagamjain",
  host: "localhost",
  database: "Postgre-APIs-App",
  password: "process.env.PASSWORD",
  port: 5432,
});

export default pool;