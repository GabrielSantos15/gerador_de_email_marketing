import "./editor-elemento.estilos.css";
import TipTapEditor from "../tiptapEditor";
import Input from "../Input";
import EditorImagem from "../EditorImagem";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

function EditorCard({ children, largura, sortableProps }) {
  return (
    <article
      className={`editor-card ${largura === "big" ? "span-2" : ""}`}
      {...sortableProps}
    >
      {children}
    </article>
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: elemento.id });

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    visibility: isDragging ? "hidden" : "visible", // Esconde o elemento original enquanto é arrasto
  };

  const renderContent = () => {
    switch (elemento.tipo) {
      case "texto":
        return (
          <TipTapEditor
            index={elemento.id}
            content={elemento.texto || ""}
            onChange={(html) => atualizarElemento(elemento.id, { texto: html })}
          />
        );
      case "botao":
        return (
          <>
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
          </>
        );
      case "card":
        return (
          <>
            <span>
              <label>Cor Fundo</label>
              <Input
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
          </>
        );
      case "imagem":
      case "banner":
        return (
          <EditorImagem
            index={elemento.id}
            elemento={elemento}
            atualizarElemento={atualizarElemento}
          />
        );
      case "html":
        return (
          <textarea
            className="codigoTextArea"
            value={elemento.codigo || ""}
            onChange={(e) =>
              atualizarElemento(elemento.id, { codigo: e.target.value })
            }
            placeholder="Cole seu código HTML aqui (Lembre-se de usar estilos inline compatíveis com email!)"
            style={{ width: "100%", height: "150px" }}
          ></textarea>
        );
      default:
        return null;
    }
  };

  return (
    <EditorCard
      largura={elemento.largura}
      sortableProps={{
        ref: setNodeRef,
        style: sortableStyle,
        ...attributes, // Atributos aplicados ao elemento principal
      }}
    >
      <div className="elemento-header">
        <span>
          <span
            className="drag-handle"
            {...listeners} // Listeners aplicados apenas ao handle
            title="Arraste para mover"
            style={{ cursor: "grab", marginRight: "8px" }}
          >
            :::
          </span>
          <h3>
            {elemento.tipo.charAt(0).toUpperCase() + elemento.tipo.slice(1)}
          </h3>
        </span>
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
      {renderContent()}
    </EditorCard>
  );
}
