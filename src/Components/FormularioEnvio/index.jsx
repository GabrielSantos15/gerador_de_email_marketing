import { useState } from "react";
import "./formulario-envio.estilos.css";
import Input from "../Input";
import Label from "../Label";

export default function FormularioEnvio({ html, imagens }) {
  const [to, setTo] = useState("comunicados.gs.dev@outlook.com");
  const [subject, setSubject] = useState("");

  const enviarEmail = async (e) => {
    e.preventDefault();
    if (!confirm("Você tem certeza?")) return;

    await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, html, imagens }),
    });
    alert("E-mail enviado!");
  };

  return (
    <section className="formulario-envio">
      <article className="config-envio">
        <h3>Enviar E-mail</h3>
        <fieldset className="campo-forms">
          <Label htmlFor="destinatárioInput">Destinatario:</Label>
          <Input
            id="destinatárioInput"
            type="email"
            placeholder="destinatario@gmail.com; destinatorio2@gmail.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          ></Input>
        </fieldset>
        <fieldset className="campo-forms">
          <Label htmlFor="assuntoInput">Assunto:</Label>
          <Input
            id="assuntoInput"
            type="text"
            placeholder="Esse email é sobre..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></Input>
        </fieldset>
        <fieldset className="campo-forms">
          <button className="botaoEnviar" onClick={enviarEmail}>
            <i class="fa-solid fa-paper-plane"></i>
            <span>Enviar</span>
          </button>
        </fieldset>
      </article>
      <article className="export-container">
        <h3>Exportar</h3>
        <button
          className="botaoExport"
          onClick={(e) => {
            e.preventDefault();

            // Substitui os CIDs pelas imagens em Base64
            let conteudo = html;

            imagens.forEach((img, idx) => {
              const src = `${img.base64}`;
              conteudo = conteudo.replaceAll(`cid:imagem${idx + 1}`, src);
            });

            // Cria o arquivo HTML
            const blob = new Blob([conteudo], { type: "text/html" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "SendPro_Email.html";
            link.click();
          }}
        >
          <i class="fa-solid fa-download"></i> HTML
        </button>
      </article>
    </section>
  );
}
