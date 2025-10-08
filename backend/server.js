import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.post("/send-email", async (req, res) => {
  const { to, subject, html, imagens } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Monta os attachments a partir do array de imagens (essas fotos são inseridas como anexo e mostradas no html)
const attachments = imagens.map((img, index) => {
  // divide as partes da url base64 (tipo e codigo)
  const matches = img.base64.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches) return null;

  const mimeType = matches[1]; 
  const base64Data = matches[2];

  return {
    filename: `imagem${index + 1}.${mimeType.split("/")[1]}`,
    content: base64Data,
    encoding: "base64",
    cid: `imagem${index + 1}`,
    contentType: mimeType,
  };
}).filter(Boolean);


  let mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
    attachments, 
  };

  try {
    console.log("enviando E-mail");
    await transporter.sendMail(mailOptions);
    console.log("enviado");

    res.json({ ok: true });
  } catch (error) {
    console.log("Algo deu errado: ");
    console.log(error);
    res.status(500).json({ error: "Erro ao enviar email" });
  }
});

app.listen(3000, () =>
  console.log("🚀 Backend rodando em http://localhost:3000")
);
