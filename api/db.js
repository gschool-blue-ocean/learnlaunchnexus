import * as dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

//new pool instance
const DATABASE_URL = "postgres://vidia_database_user:ETt8D6r7WL3H09LGHYJkCwATNNfEwuZd@dpg-cisqavtiuie5ebbvq74g-a.oregon-postgres.render.com/career_services_db?ssl=true"

const dbString = DATABASE_URL;

const pool = new Pool({
  connectionString: dbString,
});

export default pool