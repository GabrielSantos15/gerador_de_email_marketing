import { BackgroundColor } from '@tiptap/extension-text-style';
import './header.estilos.css'
import { Link } from "react-router-dom";

export default function Header({BackgroundColor}) {
  return (
    <header style={BackgroundColor = {BackgroundColor}} className='header'>
      <h1>SendPro</h1>
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
