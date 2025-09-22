import "./buttonAdd.estilos.css";

export default function ButtonAdd() {
  return (
    <div className="container-select-elemento">
      <button className="buttonAdd">+</button>
      <article className="select-container">
        <div>
            Card
        </div>
        <div>
            Titulo
        </div>
        <div>
            Paragrafo
        </div>
        <div>
            Banner
        </div>
        <div>
            imagem
        </div>
      </article>
    </div>
  );
}
