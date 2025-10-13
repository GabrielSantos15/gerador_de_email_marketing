import "./Home.estilos.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="mainHome">
      <section className="homeLadingPage">
        <article>
          <h3>SendPro</h3>
          <h2>Envie e-mails que impressionam</h2>
          <p>Começe a criar hoje mesmo!</p>

          <Link to="/gerador" className="startButton">
            <p>Começar</p>
            
              <i class="fa-solid fa-arrow-right icon"></i>
            
          </Link>
        </article>
      </section>
    </main>
  );
}
