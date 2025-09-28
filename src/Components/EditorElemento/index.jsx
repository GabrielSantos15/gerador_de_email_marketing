import "./editor-elemento.estilos.css";
import TipTapEditor from "../tiptapEditor";
import Input from "../Input";

export default function EditorElemento({ index, elemento, atualizarElemento, adicionarImagem }) {
  switch (elemento.tipo) {
    case "titulo":
      return (
        <div className="editor-card">
          <h3>Titulo</h3>
          <Input
            type="text"
            value={elemento.texto || ""}
            onChange={(e) =>
              atualizarElemento(index, { texto: e.target.value })
            }
          />
        </div>
      );

    case "paragrafo":
      return (
        <div className="editor-card">
          <h3>Parágrafo</h3>
          <TipTapEditor
            content={elemento.texto || ""}
            onChange={(html) => atualizarElemento(index, { texto: html })}
          />
        </div>
      );

    case "card":
      return (
        <div className="editor-card">
          <h3>CorFundo</h3>
          <input
            type="color"
            value={elemento.corFundo || "#ffffff"}
            onChange={(e) =>
              atualizarElemento(index, { corFundo: e.target.value })
            }
          />
          <h3>Titulo</h3>
          <Input
            type="text"
            value={elemento.titulo || ""}
            onChange={(e) =>
              atualizarElemento(index, { titulo: e.target.value })
            }
          />
          <h3>Editar paragrafo</h3>
          <TipTapEditor
            content={elemento.paragrafo || ""}
            onChange={(html) => atualizarElemento(index, { paragrafo: html })}
          />
        </div>
      );

    case "imagem":
      return (
        <div className="editor-card">
          <h3>Imagem</h3>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("image", file);

              
              adicionarImagem({base64: await fileToBase64(file)});
            }}
          />
        </div>
      );

    case "banner":
      return (
        <div className="editor-card">
          <h3>Imagem</h3>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("image", file);

              
              adicionarImagem({base64: await fileToBase64(file)});
            }}
          />
        </div>
      );

    default:
      return null;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
