import "dotenv/config";
import express from "express";
import { PORT } from "./config.js";
import { pool } from "./database/db.js";
import userRouter from "./routes/user.route.js";

const app = express();

(async function testConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("Conexión exitosa");
  } catch (error) {
    console.error("Error de conexión:", error);
  }
})();

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
