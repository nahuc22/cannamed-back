import bcrypt from "bcryptjs";
import { User } from "../db.js";
import sendMail from "../utils/nodemailer/nodemailer.js";
import getToken from "../utils/jsonwebtoken/jsonwebtoken.js";

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    throw new Error("Todos los campos (email, password, phone) son requeridos.");
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("El usuario ya existe.");
  }

  const cryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: cryptedPassword });

  const token = getToken(user);

  try {
    await sendMail(email, "Bienvenido a CannaMed", "<b>Gracias por registrarte</b>");
  } catch (error) {
    console.error("Error al enviar email:", error);
  }

  return { ...user.toJSON(), token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Contraseña incorrecta.");
  }

  const token = getToken(user);

  return { ...user.toJSON(), token };
};
