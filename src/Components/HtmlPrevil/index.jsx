import DOMPurify from "dompurify";
import './previl.estilos.css'

export default function HtmlPrevil({ conteudo }) {
  // Sanitiza antes de injetar
  const safeHtml = DOMPurify.sanitize(conteudo);

  return (
    <iframe className="previl-html"
      title="preview"
      srcDoc={safeHtml} 
    />
  );
}
