import './header.estilos.css'

export default function Header(props) {
  return (
    <header className='header'>
      <h1>Gerador de comunicado</h1>
      {props.children}
    </header>
  );
}
