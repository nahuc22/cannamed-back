// sendMail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Soporte para __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const { USER, PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: USER,
    pass: PASSWORD,
  },
});

const sendMail = async (to, subject, html) => {
  try {
    await transporter.sendMail({ from: USER, to, subject, html });
    console.log("✅ Email enviado a:", to);
  } catch (error) {
    console.error("❌ Error enviando email:", error);
  }
};

export default sendMail;
