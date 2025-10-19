import DOMPurify from "dompurify";
import "./previl.estilos.css";

export default function HtmlPrevil({ conteudo, imagens }) {;
  // converte os cids para base64
  imagens.forEach((img, idx) => {
    const src = `${img.base64}`;
    conteudo = conteudo.replaceAll(`cid:imagem${idx + 1}`, src);
  });

  return (
    // <section className="previl-container">
      <iframe
        className="previl-html"
        title="preview"
        srcDoc={conteudo}
        sandbox="allow-popups allow-scripts"
      />
    // </section>
  );
}
