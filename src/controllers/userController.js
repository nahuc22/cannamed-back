import { User } from '../db.js';
import * as userService from '../services/authServices.js';

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await userService.createUser({ name, email, password });
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error al crear el usuario',
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: `No se encontró un usuario con el ID ${id}` });
    }

    await user.destroy();

    res.status(200).send(`El usuario con ID ${id} ha sido eliminado con éxito.`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, phone } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: `No se encontró un usuario con el ID ${id}` });
    }

    const updatedUser = await user.update({
      email,
      password,
      phone,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
