import { useEffect, useRef } from "react";
import "./editor-imagem.estilos.css";

export default function EditorImagem({ elemento, atualizarElemento }) {
  const dropZoneRef = useRef(null);

  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDrop = async (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (!file) return;
      const base64 = await fileToBase64(file);
      atualizarElemento(elemento.id, { base64 });
    };

    const handleDragOver = (e) => e.preventDefault();

    dropZone.addEventListener("drop", handleDrop);
    dropZone.addEventListener("dragover", handleDragOver);

    return () => {
      dropZone.removeEventListener("drop", handleDrop);
      dropZone.removeEventListener("dragover", handleDragOver);
    };
  }, [elemento.id, atualizarElemento]);

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="editorImagemContainer">
      <input
        id={"imgInput" + elemento.id}
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          atualizarElemento(elemento.id, { base64: await fileToBase64(file) });
        }}
      />
      <label
        htmlFor={"imgInput" + elemento.id}
        id={"dropZoneImage" + elemento.id}
        className="dropZoneImageContainer"
        ref={dropZoneRef}
      >
        <div className={`dropZoneImage ${elemento.base64 ? "hidden" : ""}`}>
          <i className="fa-solid fa-image"></i>
          <p>Selecione uma imagem</p>
        </div>
        <img
          className={`editorImagemPrevil ${elemento.base64 ? "" : "hidden"}`}
          src={elemento.base64 ? elemento.base64 : ""}
          alt=""
        />
      </label>
    </div>
  );
}
