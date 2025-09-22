import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // senha de aplicativo
    },
    tls: {
      rejectUnauthorized: false, // 👈 só para evitar erro local
    },
  });

  let options = {
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
    text: "Parce que algo deu errado 😥",
  };

  const sendEmail = async () => {
    try {
      console.log("enviando E-mail");
      await transporter.sendMail(options);
      console.log("enviado")
    } catch (error) {
      console.log("Algo deu errado: ");
      console.log(error);
    }
  };
  sendEmail();
  console.log(html)
});

app.listen(3000, () =>
  console.log("🚀 Backend rodando em http://localhost:3000")
);
