import { useState } from "react";
import Button from "../Button";
import "./formulario-envio.estilos.css";
import Input from "../Input";
import CampoForms from "../CampoForms";
import Label from "../Label";

export default function FormularioEnvio({ html, imagens }) {
  const [to, setTo] = useState("comunicados.gs.dev@outlook.com");
  const [subject, setSubject] = useState("");

  const enviarEmail = async (e) => {
    e.preventDefault();
    if (!confirm("ctz?")) return;

    await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, html, imagens }),
    });
    alert("E-mail enviado!");
  };

  return (
    <form className="formulario-envio">
      <label htmlFor="formularioEnvioClose" id="formularioEnvioCloseLabel"> <i className="fa-solid fa-arrow-right"></i> </label>
      <input arial-hidden="true" type="checkbox" name="" id="formularioEnvioClose" />
      <h3>Enviar E-mail</h3>
      <CampoForms>
        <Label htmlFor="destinatárioInput">Destinatario:</Label>
        <Input
          id="destinatárioInput"
          type="email"
          placeholder="destinatario@gmail.com; destinatorio2@gmail.com ...."
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        ></Input>
      </CampoForms>
      <CampoForms>
        <Label htmlFor="assuntoInput">Assunto:</Label>
        <Input
          id="assuntoInput"
          type="text"
          placeholder="Assunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        ></Input>
      </CampoForms>
      <CampoForms>
        <Button onClickFunction={enviarEmail} text="Enviar"></Button>
      </CampoForms>
    </form>
  );
}
