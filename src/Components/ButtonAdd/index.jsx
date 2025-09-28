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
              corFundo: "#fff"
            })
          }
        >
          Card
        </div>
        <div
          onClick={() =>
            functionOnClick({
              tipo: "imagem",
              foto: ""
            })
          }
        >
           imagem
        </div>
        <div
          onClick={() =>
            functionOnClick({
              tipo: "banner",
              foto: ""
            })
          }
        >
           Banner
        </div>
      </article>
    </div>
  );
}
