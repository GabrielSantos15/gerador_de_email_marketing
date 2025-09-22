import { useState, useEffect } from "react";
import "./formulario-criacao.estilos.css";
import ButtonAdd from "../ButtonAdd";
import EditorElemento from "../EditorElemento";

export default function FormularioCriacao({
  elementos,
  setElementos,
  setHtml,
}) {

  const [colorBg, setColorBg] = useState("#fff");

  useEffect(() => {
    const conteudoHtml = elementos
      .map((el) => {
        if (el.tipo === "titulo")
          return `<h1 style="color:${el.cor}; font-family: ${el.fonte}">${el.texto}</h1>`;
        if (el.tipo === "paragrafo")
          return `<p style="font-size:16px;color:#0f0;">Paragrafo</p>`;
        if (el.tipo === "botao")
          return `<a href="#" style="background:#007BFF; color:#fff; padding:10px 15px; text-decoration:none; border-radius:5px;">Botão</a>`;
        return "";
      })
      .join("");

    const htmlFinal = `<div style="background-color: ${colorBg}; padding: 20px;">${conteudoHtml}</div>`;
    setHtml(htmlFinal);
  }, [elementos, colorBg, setHtml]); 

  const adicionarElemento = (elemento) => {
    const atualizados = elemento ? [...elementos, elemento] : elementos;
    setElementos(atualizados);
  };

  const atualizarElemento = (index, novosCampos) => {
    const atualizados = elementos.map((el, i) =>
      i === index ? { ...el, ...novosCampos } : el
    );
    setElementos(atualizados);
  };

  return (
    <section className="formulario-criacao">
      <input
        type="color"
        value={colorBg}
        onChange={(e) => setColorBg(e.target.value)}
      />

      {elementos.map((el, i) => (
        <EditorElemento
          index={i}
          elemento={el}
          atualizarElemento={atualizarElemento}
        />
      ))}

      <ButtonAdd functionOnClick={adicionarElemento} />
    </section>
  );
}
