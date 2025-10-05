import "./Input.estilos.css";

export default function Input(props) {
  return (
    <input className="input" style={{ "--value": props.value }} {...props} />
  );
}
