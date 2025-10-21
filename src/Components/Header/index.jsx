import { BackgroundColor } from '@tiptap/extension-text-style';
import './header.estilos.css'
import { Link } from "react-router-dom";

export default function Header({BackgroundColor, Color}) {
  return (
    <header style={{backgroundColor : BackgroundColor,color :Color}} className='header'>
      <h1 className='logo'>Send<mark>Pro</mark></h1>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/gerador">Gerador</Link>
            </li>
          </ul>
        </nav>
    </header>
  );
}
