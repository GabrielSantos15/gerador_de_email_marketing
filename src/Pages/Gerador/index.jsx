import { useState } from "react";

import "./gerador.estilos.css";
import FormularioEnvio from "../../Components/FormularioEnvio";
import HtmlPrevil from "../../Components/HtmlPrevil";
import FormularioCriacao from "../../Components/FormularioDeCriacao";
import Header from "../../Components/Header";

function Gerador() {
  const [html, SetHtml] = useState("MONTE SEU EMAIL AO LADO");
  const [htmlElements, SetHtmlElements] = useState([]);
  const [colorBg, setColorBg] = useState("#f2f2f2");
  const [imageBg, setimageBg] = useState("");
  const [mostrarFormularioCriacao, setMostrarFormularioCriacao] =
    useState(true);

  const imagens = htmlElements
    ? htmlElements.filter((el) => el.tipo === "imagem" || el.tipo === "banner")
    : [];

  return (
    <>
      <Header></Header>
      <main className="mainGerador">
        <input
          className="input-Alternar-container"
          type="checkbox"
          id="formularioSeletor"
          onChange={(e) =>
            setMostrarFormularioCriacao(!mostrarFormularioCriacao)
          }
          checked={mostrarFormularioCriacao}
        />

        <FormularioCriacao
          elementos={htmlElements}
          setElementos={SetHtmlElements}
          setHtml={SetHtml}
          colorBg={colorBg}
          setColorBg={setColorBg}
          imageBg={imageBg}
          setimageBg={setimageBg}
          mostrarFormularioCriacao={mostrarFormularioCriacao}
        />
        <HtmlPrevil conteudo={html} imagens={imagens}></HtmlPrevil>
        <FormularioEnvio
          html={html}
          imagens={imagens}
          mostrarFormularioCriacao={mostrarFormularioCriacao}
        ></FormularioEnvio>
      </main>
    </>
  );
}

export default Gerador;
