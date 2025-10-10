import "./buttonAdd.estilos.css";

export default function ButtonAdd({ functionOnClick }) {
  // Função auxiliar para injetar valores Padrão
  const montarElemento = (baseElement) => {
    const elemento = {
      // ID único
      id: Date.now() + Math.random(),
      //  Padrão de largura
      largura: "big",

      // Mantém as propriedades específicas
      ...baseElement,
    };
    functionOnClick(elemento);
  };

  return (
    <div className="container-select-elemento">
      <button className="buttonAdd">
        <i className="fa-solid fa-plus"></i>
      </button>
      <article className="select-container">
        <div
          onClick={() =>
            montarElemento({
              tipo: "texto",
              texto: "",
            })
          }
        >
          Texto
        </div>
        <div
          onClick={() =>
            montarElemento({
              tipo: "card",
              titulo: "",
              paragrafo: "",
              corFundo: "#ffffff",
            })
          }
        >
          Card
        </div>
        <div
          onClick={() =>
            montarElemento({
              tipo: "botao",
              texto: "Acessar",
              corFundo: "#e00043",
              corTexto: "#ffffff",
              arredondamento: 5,
            })
          }
        >
          Botão
        </div>
        <div
          onClick={() =>
            montarElemento({
              tipo: "imagem",
              foto: "",
            })
          }
        >
          imagem
        </div>
        <div
          onClick={() =>
            montarElemento({
              tipo: "banner",
              foto: "",
            })
          }
        >
          Banner
        </div>
        <div
          onClick={() =>
            montarElemento({
              tipo: "html",
              codigo: "",
            })
          }
        >
          HTML Personalizado
        </div>
      </article>
    </div>
  );
}
