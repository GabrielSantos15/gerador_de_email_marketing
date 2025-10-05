import "./buttonAdd.estilos.css";

export default function ButtonAdd({ functionOnClick }) {
  return (
    <div className="container-select-elemento">
      <button className="buttonAdd">+</button>
      <article className="select-container">
        <div
          onClick={() =>
            functionOnClick({
              tipo: "titulo",
              texto: "",
              largura: "big",
            })
          }
        >
          Titulo
        </div>
        <div
          onClick={() =>
            functionOnClick({
              tipo: "paragrafo",
              texto: "",
              largura: "big",
            })
          }
        >
          Paragrafo
        </div>
        <div
          onClick={() =>
            functionOnClick({
              tipo: "card",
              titulo: "",
              paragrafo: "",
              corFundo: "#fff",
              largura: "big",
            })
          }
        >
          Card
        </div>
        <div
          onClick={() =>
            functionOnClick({
              tipo: "botao",
              texto: "",
              largura: "big",
            })
          }
        >
          Botão
        </div>
        <div
          onClick={() =>
            functionOnClick({
              tipo: "imagem",
              foto: "",
              largura: "big",
            })
          }
        >
          imagem
        </div>
        <div
          onClick={() =>
            functionOnClick({
              tipo: "banner",
              foto: "",
              largura: "big",
            })
          }
        >
          Banner
        </div>
      </article>
    </div>
  );
}
