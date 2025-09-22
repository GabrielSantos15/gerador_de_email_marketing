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
              texto: "Meu título",
              cor: "#333",
              fonte: "Arial",
            })
          }
        >
          Titulo
        </div>
        <div
          onClick={() =>
            functionOnClick({
              tipo: "paragrafo",
              texto: "Meu paragrafo",
              cor: "#000000ff",
              fonte: "Arial",
            })
          }
        >
          Paragrafo
        </div>
      </article>
    </div>
  );
}
