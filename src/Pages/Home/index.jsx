import "./Home.estilos.css";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";

export default function Home() {
  return (
    <main className="mainHome">
      <Header />
      <section className="homeLadingPage">
        <article className="apresentacaoHome">
          <h3>SendPro</h3>
          <h2>Envie e-mails que impressionam</h2>
          <p>Tudo direto do seu navegador</p>

          <Link to="/gerador" className="startButton">
            <p>Começar</p>

            <i class="fa-solid fa-arrow-right icon"></i>
          </Link>
        </article>
        <article className="cardsHome">
          <div className="LiquidGlass cardHome">
            <h4>Profissionalismo instantâneo</h4>
            <p>
              Crie e-mails com visual moderno, personalizados e otimizados para
              qualquer dispositivo.
            </p>
          </div>
          <div className="LiquidGlass cardHome">
            <h4>Comunicação eficaz</h4>
            <p>
              Envie comunicados internos, campanhas e newsletters que realmente
              chamam atenção.
            </p>
          </div>
          <div className="LiquidGlass cardHome">
            <h4>Simples e rápido</h4>
            <p>
              Monte e envie seus e-mails em minutos, sem complicações ou
              necessidade de conhecimentos técnicos.
            </p>
          </div>
          <div className="LiquidGlass cardHome">
            <h4>Tudo em um só lugar</h4>
            <p>
              Desde a criação até o envio, gerencie todo o processo de e-mail
              marketing em uma única plataforma.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
