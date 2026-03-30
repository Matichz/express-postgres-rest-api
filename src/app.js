import "dotenv/config";
import express from "express";
import { PORT } from "./config.js";
import userRouter from "./routes/user.route.js";
import { testConnection } from "./database/db.js";

await testConnection();

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
