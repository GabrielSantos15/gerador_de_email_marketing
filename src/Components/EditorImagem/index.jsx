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
      const resizedBase64 = await resizeImageToBase64(file);
      atualizarElemento(elemento.id, { base64: resizedBase64 });
    };

    const handleDragOver = (e) => e.preventDefault();

    dropZone.addEventListener("drop", handleDrop);
    dropZone.addEventListener("dragover", handleDragOver);

    return () => {
      dropZone.removeEventListener("drop", handleDrop);
      dropZone.removeEventListener("dragover", handleDragOver);
    };
  }, [elemento.id, atualizarElemento]);

  async function resizeImageToBase64(file, maxWidth = 800) {
    return new Promise((resolve, reject) => {
      // Verifica se o arquivo é um GIF (ele não é redimensionado para não perder a animação)
      if (file.type === "image/gif") {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); 
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

      // Para outros tipos de imagem, redimensiona
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calcula a nova largura e altura mantendo a proporção
          const scale = Math.min(maxWidth / img.width, 1); // Não aumenta imagens menores que maxWidth
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          // Redimensiona a imagem no canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Converte o canvas para Base64
          resolve(canvas.toDataURL("image/jpeg", 0.8)); // Qualidade 80% (ajustável)
        };
        img.onerror = reject;
        img.src = reader.result;
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
          const resizedBase64 = await resizeImageToBase64(file);
          atualizarElemento(elemento.id, { base64: resizedBase64 });
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
