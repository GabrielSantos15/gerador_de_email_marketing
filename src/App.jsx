import { useState } from "react";

import "./App.css";
import FormularioEnvio from "./Components/FormularioEnvio";
import HtmlPrevil from "./Components/HtmlPrevil";
import FormularioCriacao from "./Components/FormularioDeCriacao";

function App() {
  const [htmlElements, SetHtmlElements] = useState([]);
  const [html, SetHtml] = useState("teste");
  const [images, SetImage] = useState([]);

  return (
    <>
      <header>
        <img src="/logo.png" alt="logo" />
        <h1>Gerador de comunicado</h1>
      </header>
      <main>
        <FormularioCriacao
          elementos={htmlElements}
          setElementos={SetHtmlElements}
          setHtml={SetHtml}
          images={images}
          SetImage={SetImage}
        />
        <HtmlPrevil conteudo={html} images={images}></HtmlPrevil>
        <FormularioEnvio html={html} images={images}></FormularioEnvio>
      </main>
    </>
  );
}

export default App;
