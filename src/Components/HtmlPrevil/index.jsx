import DOMPurify from "dompurify";
import './previl.estilos.css'

export default function HtmlPrevil({ conteudo, images }) {
  let safeHtml = DOMPurify.sanitize(conteudo);

  if (images && Array.isArray(images)) {
    images.forEach((img, idx) => {
      const src = `data:image/png;base64,${img.base64}`;
      safeHtml = safeHtml.replaceAll(`cid:imagem${idx + 1}`, src);
    });
  }

  return (
    <iframe
      className="previl-html"
      title="preview"
      srcDoc={safeHtml}
    />
  );
}
