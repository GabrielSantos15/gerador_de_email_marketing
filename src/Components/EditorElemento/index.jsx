import "./editor-elemento.estilos.css";
import TipTapEditor from "../tiptapEditor";
import Input from "../Input";
import EditorImagem from "../EditorImagem";
import { useState } from "react";

function SelectTamanho({ value, onChange }) {
  return (
    <span>
      <label htmlFor="sizeSelect">Tamanho</label>
      <select id="sizeSelect" name="size" value={value} onChange={onChange}>
        <option value="small">1/2</option>
        <option value="big">2/2</option>
      </select>
    </span>
  );
}

function EditorCard({ children, largura }) {
  return (
    <div className={`editor-card ${largura === "big" ? "span-2" : ""}`}>
      {children}
    </div>
  );
}

function ElementoActions({ elemento, removerElemento }) {
  const [showActions, setShowActions] = useState(false);
  return (
    <div className="elemento-actions">
      <i
        className="fas fa-ellipsis-v"
        onClick={() => setShowActions(!showActions)}
      ></i>
      <div
        className="menuActions"
        style={{ display: showActions ? "block" : "none" }}
      >
        <ul>
          <li onClick={() => removerElemento(elemento.id)}>
            <i className="fa-solid fa-x"></i> Delete
          </li>
        </ul>
        <span
          className="overlay"
          onClick={() => setShowActions(!showActions)}
        ></span>
      </div>
    </div>
  );
}

export default function EditorElemento({
  elemento,
  atualizarElemento,
  removerElemento,
}) {
  switch (elemento.tipo) {
    case "texto":
      return (
        <EditorCard largura={elemento.largura}>
          <div className="elemento-header">
            <h3>Texto</h3>
            <span>
              <SelectTamanho
                value={elemento.largura}
                onChange={(e) =>
                  atualizarElemento(elemento.id, { largura: e.target.value })
                }
              />
              <ElementoActions
                elemento={elemento}
                removerElemento={removerElemento}
              />
            </span>
          </div>
          <TipTapEditor
            index={elemento.id}
            content={elemento.texto || ""}
            onChange={(html) => atualizarElemento(elemento.id, { texto: html })}
          />
        </EditorCard>
      );
    case "botao":
      return (
        <EditorCard largura={elemento.largura}>
          <div className="elemento-header">
            <h3>Botão</h3>
            <span>
              <SelectTamanho
                value={elemento.largura}
                onChange={(e) =>
                  atualizarElemento(elemento.id, { largura: e.target.value })
                }
              />
              <ElementoActions
                elemento={elemento}
                removerElemento={removerElemento}
              />
            </span>
          </div>
          <span>
            <p>Fundo</p>
            <Input
              type="color"
              value={elemento.corFundo}
              onChange={(e) =>
                atualizarElemento(elemento.id, { corFundo: e.target.value })
              }
            />
          </span>
          <span>
            <p>Cor Texto</p>
            <Input
              type="color"
              value={elemento.corTexto}
              onChange={(e) =>
                atualizarElemento(elemento.id, { corTexto: e.target.value })
              }
            />
          </span>
          <span>
            <p>Arredondar</p>
            <Input
              type="number"
              value={elemento.arredondamento}
              onChange={(e) =>
                atualizarElemento(elemento.id, {
                  arredondamento: e.target.value,
                })
              }
            />
            <p>Texto</p>
            <Input
              type="text"
              value={elemento.texto || ""}
              onChange={(e) =>
                atualizarElemento(elemento.id, { texto: e.target.value })
              }
            />
          </span>
          <p>Link</p>
          <Input
            type="url"
            value={elemento.link || ""}
            onChange={(e) =>
              atualizarElemento(elemento.id, { link: e.target.value })
            }
          />
        </EditorCard>
      );
    case "card":
      return (
        <EditorCard largura={elemento.largura}>
          <div className="elemento-header">
            <h3>Card</h3>
            <span>
              <SelectTamanho
                value={elemento.largura}
                onChange={(e) =>
                  atualizarElemento(elemento.id, { largura: e.target.value })
                }
              />
              <ElementoActions
                elemento={elemento}
                removerElemento={removerElemento}
              />
            </span>
          </div>
          <span>
            <label>Cor Fundo</label>
            <input
              type="color"
              value={elemento.corFundo || "#ffffff"}
              onChange={(e) =>
                atualizarElemento(elemento.id, { corFundo: e.target.value })
              }
            />
          </span>
          <span>
            <TipTapEditor
              index={elemento.id}
              content={elemento.texto || ""}
              onChange={(html) =>
                atualizarElemento(elemento.id, { texto: html })
              }
            />
          </span>
        </EditorCard>
      );
    case "imagem":
      return (
        <EditorCard largura={elemento.largura}>
          <div className="elemento-header">
            <h3>Imagem</h3>
            <span>
              <SelectTamanho
                value={elemento.largura}
                onChange={(e) =>
                  atualizarElemento(elemento.id, { largura: e.target.value })
                }
              />
              <ElementoActions
                elemento={elemento}
                removerElemento={removerElemento}
              />
            </span>
          </div>
          <EditorImagem
            index={elemento.id}
            elemento={elemento}
            atualizarElemento={atualizarElemento}
          />
        </EditorCard>
      );
    case "banner":
      return (
        <EditorCard largura={elemento.largura}>
          <div className="elemento-header">
            <h3>Banner</h3>
            <ElementoActions
              elemento={elemento}
              removerElemento={removerElemento}
            />
          </div>
          <EditorImagem
            index={elemento.id}
            elemento={elemento}
            atualizarElemento={atualizarElemento}
          />
        </EditorCard>
      );
    case "html":
      return (
        <EditorCard largura={elemento.largura}>
          <div className="elemento-header">
            <h3>HTML</h3>
            <span>
              <SelectTamanho
                value={elemento.largura}
                onChange={(e) =>
                  atualizarElemento(elemento.id, { largura: e.target.value })
                }
              />
              <ElementoActions
                elemento={elemento}
                removerElemento={removerElemento}
              />
            </span>
          </div>
          <textarea
            className="codigoTextArea"
            value={elemento.codigo || ""}
            onChange={(e) =>
              atualizarElemento(elemento.id, { codigo: e.target.value })
            }
            placeholder="Cole seu código HTML aqui (Lembre-se de usar estilos inline compativeis com email!)"
            style={{ width: "100%", height: "150px" }}
          ></textarea>
        </EditorCard>
      );
    default:
      return null;
  }
}
