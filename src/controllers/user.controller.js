import { UserRepository } from "../respositories/user.repository.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await UserRepository.getAllUsers();
    res.json(users);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await UserRepository.findUserById(id);
    console.log(user);

    // result.rows.length === 0
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const userExists = await UserRepository.findUserByEmail(email);

    if (userExists) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    const newUser = await UserRepository.createUser(name, email);

    return res.status(201).json({
      success: true,
      user: newUser,
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUsername = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  try {
    const user = await UserRepository.findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await UserRepository.updateUsername(name, id);

    res.status(200).json({ message: "Usuario actualizado" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await UserRepository.findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await UserRepository.deleteUser(id);

    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const UserController = {
  getAllUsers,
  getUser,
  createUser,
  updateUsername,
  deleteUser,
};
