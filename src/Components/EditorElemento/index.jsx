import Input from '../Input';
import './editor-elemento.estilos.css'

export default function EditorElemento({ index, elemento, atualizarElemento }) {
  switch (elemento.tipo) {
    case "titulo":
      return (
        <div className="editor-card">
          <h3>Editar Título</h3>
          <Input
            type="text"
            value={elemento.texto}
            onChange={(e) => atualizarElemento(index, { texto: e.target.value })}
          />
          <Input
            type="color"
            value={elemento.cor}
            onChange={(e) => atualizarElemento(index, { cor: e.target.value })}
          />
          <select
            value={elemento.fonte}
            onChange={(e) => atualizarElemento(index, { fonte: e.target.value })}
          >
            <option>Arial</option>
            <option>Verdana</option>
            <option>Tahoma</option>
          </select>
        </div>
      );
      break
    case "paragrafo":
      return (
        <div className="editor-card">
          <h3>Editar Paragrafo</h3>
          <input
            type="text"
            value={elemento.texto}
            onChange={(e) => atualizarElemento(index, { texto: e.target.value })}
          />
          <input
            type="color"
            value={elemento.cor}
            onChange={(e) => atualizarElemento(index, { cor: e.target.value })}
          />
          <select
            value={elemento.fonte}
            onChange={(e) => atualizarElemento(index, { fonte: e.target.value })}
          >
            <option>Arial</option>
            <option>Verdana</option>
            <option>Tahoma</option>
          </select>
        </div>
      );
      break
    default:
      return null;
  }
}
