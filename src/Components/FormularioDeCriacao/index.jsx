import { useState } from "react";
import "./formulario-criacao.estilos.css";
import ButtonAdd from "../ButtonAdd";

export default function FormularioCriacao({ elementos, setElementos, setHtml }) {
  const [colorBg, setcolorBg] = useState("#fff");

  const adicionarElemento = (tipo) => {
    // Apenas adiciona o novo elemento se um tipo for fornecido
    const atualizados = tipo
      ? [...elementos, { tipo, conteudo: "Texto exemplo" }]
      : elementos;

    // A lógica de geração de HTML está separada para ser reutilizada
    const conteudoHtml = atualizados
      .map((el) => {
        if (el.tipo === "titulo")
          return `<h1 style="color:#333">Titulo</h1>`;
        if (el.tipo === "paragrafo")
          return `<p style="font-size:16px">Paragrafo</p>`;
        if (el.tipo === "botao")
          return `<a href="#" style="background:#007BFF; color:#fff; padding:10px 15px; text-decoration:none; border-radius:5px;">Botão</a>`;
        return "";
      })
      .join("");

    const htmlFinal = `<div style="background-color: ${colorBg}; padding: 20px;">${conteudoHtml}</div>`;

    setElementos(atualizados);
    setHtml(htmlFinal);
  };

  return (
    <section className="formulario-criacao">
      <input
        type="color"
        onChange={(e) => {
          const novaCor = e.target.value;
          setcolorBg(novaCor); // Primeiro, atualiza o estado da cor
          
          // Em seguida, gera o novo HTML com a cor atualizada
          // Passamos 'null' ou 'undefined' para não adicionar um novo elemento
          adicionarElemento(null); 
        }}
      />
      <ButtonAdd onClick={() => adicionarElemento("paragrafo")} />
      {/* Você pode adicionar mais botões aqui */}
    </section>
  );
}