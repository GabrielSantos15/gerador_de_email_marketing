import "./Home.estilos.css";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";

export default function Home() {
  return (
    <main className="mainHome">
      <Header Color={"#ffffff"} />
      <section className="homeLadingPage">
        <article className="apresentacaoHome">
          <h3>SendPro</h3>
          <h2>Envie e-mails que impressionam</h2>
          <p>Crie, personalize e envie e-mails incríveis em poucos cliques</p>

          <Link to="/gerador" className="startButton">
            <p>Começar</p>
            <i class="fa-solid fa-arrow-right icon"></i>
          </Link>
          
          <address className="redesHome">
            <a target="_blank" href="https://github.com/GabrielSantos15">
              <i class="fa-brands fa-github iconGitHub"></i>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/gabrielsantos1509/">
              <i class="fa-brands fa-linkedin iconLinkedin"></i>
            </a>
            <a target="_blank" href="https://www.instagram.com/gabrieldos5689/">
              <i class="fa-brands fa-instagram iconInstagram"></i>
            </a>
          </address>
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
