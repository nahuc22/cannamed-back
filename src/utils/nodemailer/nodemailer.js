require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const nodemailer = require("nodemailer");
const { USER, PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
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

module.exports = sendMail;
