import DOMPurify from "dompurify";
import "./previl.estilos.css";

export default function HtmlPrevil({ conteudo, imagens }) {
  let safeHtml = DOMPurify.sanitize(conteudo, {
    ADD_ATTR: ["target", "rel"],
  });

  // Filtra só imagens e banners

  imagens.forEach((img, idx) => {
    const src = `data:image/png;base64,${img.base64}`;
    safeHtml = safeHtml.replaceAll(`cid:imagem${idx + 1}`, src);
  });

  return (
    <iframe
      className="previl-html"
      title="preview"
      srcDoc={safeHtml}
      sandbox="allow-popups allow-same-origin"
    />
  );
}
