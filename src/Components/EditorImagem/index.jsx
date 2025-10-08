import { useEffect } from "react";
import "./editor-imagem.estilos.css";

export default function EditorImagem({ index, elemento, atualizarElemento }) {
  useEffect(() => {
    const dropZone = document.querySelector("#dropZoneImage" + index);
    if (!dropZone) return;

    const handleDrop = async (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (!file) return;
      const base64 = await fileToBase64(file);
      atualizarElemento(index, { base64 });
    };

    dropZone.addEventListener("drop", handleDrop);
    dropZone.addEventListener("dragover", (e) => e.preventDefault());

    return () => {
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, [index, atualizarElemento]);

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
        id={"imgInput" + index}
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          atualizarElemento(index, { base64: await fileToBase64(file) });
        }}
      />
      <label
        htmlFor={"imgInput" + index}
        id={"dropZoneImage" + index}
        className="dropZoneImageContainer"
      >
        <div className={`dropZoneImage ${elemento.base64 ? "hidden" : ""}`}>
          <i class="fa-solid fa-image"></i>
          <p>Selecione uma imagem</p>
        </div>
        <img
          className={`editorImagemPrevil ${elemento.base64 ? "" : "hidden"}`}
          src={elemento.base64 ? elemento.base64 : ""}
        />
      </label>
    </div>
  );
}
