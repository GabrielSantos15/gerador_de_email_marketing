import { useRef } from "react";
import Input from "../Input";
import "./editor-elemento.estilos.css";

export default function EditorElemento({ index, elemento, atualizarElemento }) {
  const editor = useRef(null);

  switch (elemento.tipo) {
    case "titulo":
      return (
        <div className="editor-card">
          <h3>Editar Título</h3>
          <input
            type="text"
            value={elemento.texto}
            onChange={(e) =>
              atualizarElemento(index, { texto: e.target.value })
            }
          />
          <input
            type="color"
            value={elemento.cor}
            onChange={(e) => atualizarElemento(index, { cor: e.target.value })}
          />
          <select
            value={elemento.fonte}
            onChange={(e) =>
              atualizarElemento(index, { fonte: e.target.value })
            }
          >
            <option>Arial</option>
            <option>Verdana</option>
            <option>Tahoma</option>
          </select>
        </div>
      );

    case "paragrafo":
      return (
        <div className="editor-card">
          <h3>Editar Parágrafo</h3>
          <input
            type="text"
            value={elemento.texto}
            onChange={(e) =>
              atualizarElemento(index, { texto: e.target.value })
            }
          />
          <input
            type="color"
            value={elemento.cor}
            onChange={(e) => atualizarElemento(index, { cor: e.target.value })}
          />

          <select
            value={elemento.fonte}
            onChange={(e) =>
              atualizarElemento(index, { fonte: e.target.value })
            }
          >
            <option>Arial</option>
            <option>Verdana</option>
            <option>Tahoma</option>
          </select>
        </div>
      );

    default:
      return null;
  }
}
