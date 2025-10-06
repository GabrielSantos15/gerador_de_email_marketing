import "./buttonAdd.estilos.css";

export default function ButtonAdd({ functionOnClick }) {
  return (
    <div className="container-select-elemento">
      <button className="buttonAdd"><i class="fa-solid fa-plus"></i></button>
      <article className="select-container">
        <div
          onClick={() =>
            functionOnClick({
              tipo: "texto",
              texto: "",
              largura: "big",
            })
          }
        >
          Texto
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
              texto: "Acessar",
              corFundo: "#e00043",
              corTexto: "#ffffff",
              arredondamento: 5,
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
