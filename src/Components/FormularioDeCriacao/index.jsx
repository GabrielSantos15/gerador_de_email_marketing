import { useState, useEffect } from "react";
import "./formulario-criacao.estilos.css";
import ButtonAdd from "../ButtonAdd";
import EditorElemento from "../EditorElemento";

export default function FormularioCriacao({
  elementos,
  setElementos,
  setHtml,
  images,
  SetImage,
}) {
  const [colorBg, setColorBg] = useState("#eee");

  useEffect(() => {
    let imgContador = 0;
    let conteudoHtml = elementos
      .map((el) => {
        if (el.tipo === "titulo") return `<h1>${el.texto}</h1>`;
        if (el.tipo === "paragrafo") return `<p>${el.texto}</p>`;
        if (el.tipo === "card")
          return `<div style="background-color: ${el.corFundo};border-radius: 5px;padding: 10px;font-family: system-ui, Helvetica, sans-serif;box-shadow: 5px 5px 10px #0000003d"><h2>${el.titulo}</h2><p>${el.paragrafo}</p></div>`;
        if (el.tipo === "imagem") {
          imgContador++;
          return `<img style="width:300px; max-width=100%" src="cid:imagem${imgContador}"/>`;
        }
        if (el.tipo === "banner") {
          imgContador++;
          return ` </div><img style="width:100%" src="cid:imagem${imgContador}"/><div style="background-color: ${colorBg}; padding: 20px;margin:0">`;
        }
        return "";
      })
      .join("");

    // Remove qualquer <div ...></div> vazia (com ou sem espaços dentro)
    
    let htmlFinal = `<div style="background-color: ${colorBg};"><div style="padding: 20px;">
    ${conteudoHtml}
    </div></body>`;

    setHtml(htmlFinal.replace(/<div[^>]*>\s*<\/div>/g, ""));
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
  const adicionarImagem = (imgBase64) => {
    const newImages = images ? [...images, imgBase64] : images;
    SetImage(newImages);
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
          adicionarImagem={adicionarImagem}
        />
      ))}

      <ButtonAdd functionOnClick={adicionarElemento} />
    </section>
  );
}
