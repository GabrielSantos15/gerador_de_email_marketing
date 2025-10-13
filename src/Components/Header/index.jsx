import './header.estilos.css'

export default function Header(props) {
  return (
    <header className='header'>
      <h1>SendPro</h1>
      {props.children}
    </header>
  );
}
