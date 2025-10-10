import DOMPurify from "dompurify";
import "./previl.estilos.css";

export default function HtmlPrevil({ conteudo, imagens }) {
  console.log(conteudo);
  // converte as imagens para base64
  imagens.forEach((img, idx) => {
    const src = `${img.base64}`;
    conteudo = conteudo.replaceAll(`cid:imagem${idx + 1}`, src);
  });

  return (
    <iframe
      className="previl-html"
      title="preview"
      srcDoc={conteudo}
      sandbox="allow-popups allow-scripts"
    />
  );
}
