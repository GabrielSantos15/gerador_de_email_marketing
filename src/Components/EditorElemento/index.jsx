import "./editor-elemento.estilos.css";
import TipTapEditor from "../tiptapEditor";
import Input from "../Input";

export default function EditorElemento({ index, elemento, atualizarElemento }) {
  switch (elemento.tipo) {
    case "titulo":
      return (
        <div
          className={`editor-card ${
            elemento.largura === "big" ? "span-2" : ""
          }`}
        >
          <div className="elemento-header">
            <h3>Titulo</h3>
            <span>
              <label htmlFor="sizeSelect">Tamanho</label>
              <select
                id="sizeSelect"
                name="size"
                onChange={(e) =>
                  atualizarElemento(index, { largura: e.target.value })
                }
              >
                <option value="small">1/2</option>
                <option value="big" selected>
                  2/2
                </option>
              </select>
            </span>
          </div>
          <div>
            <label htmlFor={"tituloInput" + index}>Texto</label>
            <Input
              id={"tituloInput" + index}
              type="text"
              value={elemento.texto || ""}
              onChange={(e) =>
                atualizarElemento(index, { texto: e.target.value })
              }
            />
          </div>
        </div>
      );

    case "paragrafo":
      return (
        <div
          className={`editor-card ${
            elemento.largura === "big" ? "span-2" : ""
          }`}
        >
          <div className="elemento-header">
            <h3>Paragrafo</h3>
            <span>
              <label htmlFor="sizeSelect">Tamanho</label>
              <select
                id="sizeSelect"
                name="size"
                onChange={(e) =>
                  atualizarElemento(index, { largura: e.target.value })
                }
              >
                <option value="small">1/2</option>
                <option value="big" selected>
                  2/2
                </option>
              </select>
            </span>
          </div>
          <TipTapEditor
            index= {index}
            content={elemento.texto || ""}
            onChange={(html) => atualizarElemento(index, { texto: html })}
          />
        </div>
      );

    case "botao":
      return (
        <div
          className={`editor-card ${
            elemento.largura === "big" ? "span-2" : ""
          }`}
        >
          <div className="elemento-header">
            <h3>Botão</h3>
            <span>
              <label htmlFor="sizeSelect">Tamanho</label>
              <select
                id="sizeSelect"
                name="size"
                onChange={(e) =>
                  atualizarElemento(index, { largura: e.target.value })
                }
              >
                <option value="small">1/2</option>
                <option value="big" selected>
                  2/2
                </option>
              </select>
            </span>
          </div>
          <div>
            <p>Texto</p>
            <Input
              type="text"
              value={elemento.texto || ""}
              onChange={(e) =>
                atualizarElemento(index, { texto: e.target.value })
              }
            />
            <p>Link</p>
            <Input
              type="text"
              value={elemento.link || ""}
              onChange={(e) =>
                atualizarElemento(index, { link: e.target.value })
              }
            />
          </div>
        </div>
      );

    case "card":
      return (
        <div
          className={`editor-card ${
            elemento.largura === "big" ? "span-2" : ""
          }`}
        >
          <select
            name="size"
            onChange={(e) =>
              atualizarElemento(index, { largura: e.target.value })
            }
          >
            <option value="small">1/2</option>
            <option value="big" selected>
              2/2
            </option>
          </select>
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
        <div
          className={`editor-card ${
            elemento.largura === "big" ? "span-2" : ""
          }`}
        >
          <select
            name="size"
            onChange={(e) =>
              atualizarElemento(index, { largura: e.target.value })
            }
          >
            <option value="small">1/2</option>
            <option value="big" selected>
              2/2
            </option>
          </select>
          <h3>Imagem</h3>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("image", file);

              atualizarElemento(index, { base64: await fileToBase64(file) });
            }}
          />
        </div>
      );

    case "banner":
      return (
        <div className="editor-card span-2">
          <h3>Banner</h3>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("image", file);

              atualizarElemento(index, { base64: await fileToBase64(file) });
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
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
