import "./button.modele.css"

export default function Button(props) {
  return (
    <button onClick={props.onClickFunction} style={{ backgroundColor: props.color }}>
      {props.text}
    </button>
  );
}