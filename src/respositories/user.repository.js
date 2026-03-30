import { pool } from "../database/db.js";

export const getAllUsers = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE deleted_at IS NULL",
    );
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findUserByEmail = async (email) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL",
      [email],
    );
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findUserById = async (id) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL",
      [id],
    );
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = async (name, email) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
    );
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (id) => {
  const date = new Date().toISOString().split("T")[0];
  console.log(date);

  try {
    return await pool.query("UPDATE users SET deleted_at = $1 WHERE id = $2", [
      date,
      id,
    ]);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUsername = async (name, id) => {
  try {
    return await pool.query("UPDATE users SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);
  } catch (error) {
    throw new Error(error.message);
  }
};
