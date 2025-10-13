import { useState } from "react";

import "./comunicadoMaker.estilos.css";
import FormularioEnvio from "../../Components/FormularioEnvio";
import HtmlPrevil from "../../Components/HtmlPrevil";
import FormularioCriacao from "../../Components/FormularioDeCriacao";

function Gerador() {
  const [htmlElements, SetHtmlElements] = useState([]);
  const [html, SetHtml] = useState("MONTE SEU EMAIL AO LADO");
  const [images, SetImage] = useState([]);

  const imagens = htmlElements
    ? htmlElements.filter((el) => el.tipo === "imagem" || el.tipo === "banner")
    : [];

  return (
    <>
      <main className="mainGerador">
        <FormularioCriacao
          elementos={htmlElements}
          setElementos={SetHtmlElements}
          setHtml={SetHtml}
          images={images}
          SetImage={SetImage}
        />
        <HtmlPrevil conteudo={html} imagens={imagens}></HtmlPrevil>
        <FormularioEnvio html={html} imagens={imagens}></FormularioEnvio>
      </main>
    </>
  );
}

export default Gerador;
