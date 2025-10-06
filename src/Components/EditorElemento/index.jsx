import "./editor-elemento.estilos.css";
import TipTapEditor from "../tiptapEditor";
import Input from "../Input";
import EditorImagem from "../EditorImagem";

export default function EditorElemento({ index, elemento, atualizarElemento }) {
  switch (elemento.tipo) {
    case "texto":
      return (
        <div
          className={`editor-card ${
            elemento.largura === "big" ? "span-2" : ""
          }`}
        >
          <div className="elemento-header">
            <h3>Texto</h3>
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
            <TipTapEditor
              id={"textoInput" + index}
              content={elemento.texto || ""}
              onChange={(html) => atualizarElemento(index, { texto: html })}
            />
          </div>
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
            <span>
              <p>Fundo</p>
                <Input
                type="color"
                value={elemento.corFundo}
                onChange={(e) =>
                  atualizarElemento(index, { corFundo: e.target.value })
                }
              />
            </span>
            <span>
              <p>Cor Texto</p>
                <Input
                type="color"
                value={elemento.corTexto}
                onChange={(e) =>
                  atualizarElemento(index, { corTexto: e.target.value })
                }
              />
            </span>
            <span>
              <p>Arredondar</p>
                <Input
                type="number"
                value={elemento.arredondamento}
                onChange={(e) =>
                  atualizarElemento(index, { arredondamento: e.target.value })
                }
              />
              <p>Texto</p>
              <Input
                type="text"
                value={elemento.texto || ""}
                onChange={(e) =>
                  atualizarElemento(index, { texto: e.target.value })
                }
              />
            </span>
            <p>Link</p>
            <Input
              type="url"
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
          <div className="elemento-header">
            <h3>Card</h3>
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
          <span>
            <label>Cor Fundo</label>
            <input
              type="color"
              value={elemento.corFundo || "#ffffff"}
              onChange={(e) =>
                atualizarElemento(index, { corFundo: e.target.value })
              }
            />
          </span>
          <span>
            <TipTapEditor
              index={index}
              content={elemento.texto || ""}
              onChange={(html) => atualizarElemento(index, { texto: html })}
            />
          </span>
        </div>
      );

    case "imagem":
      return (
        <div
          className={`editor-card ${
            elemento.largura === "big" ? "span-2" : ""
          }`}
        >
          <div className="elemento-header">
            <h3>Imagem</h3>
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
          <EditorImagem
            index={index}
            elemento={elemento}
            atualizarElemento={atualizarElemento}
          />
        </div>
      );

    case "banner":
      return (
        <div className="editor-card span-2">
          <h3>Banner</h3>
          <EditorImagem
            index={index}
            elemento={elemento}
            atualizarElemento={atualizarElemento}
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
