import { Pool } from "pg";
import { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } from "../config";

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

export async function testConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("Conexión exitosa");
  } catch (error) {
    console.error("Error de conexión:", error);
  }
}
