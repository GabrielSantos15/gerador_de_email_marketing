import { useState } from "react";
import "./tiptapEditor.estilos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BackgroundColor, TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";

const colorList = [
  "#000000",
  "#444444",
  "#CCCCCC",
  "#FFFFFF",
  "#0015ceff",
  "#506affff",
  "#00ccffff",
  "#70ffffff",
  "#a000dfff",
  "#a066f1ff",
  "#187900ff",
  "#67ff6eff",
  "#ffbb00ff",
  "#ffe867ff",
  "#ff3300ff",
  "#ff7755ff",
  "#8b0000ff",
  "#f73d53ff",
];

function renderColorOptions(editor) {
  return colorList.map((color) => (
    <span
      key={color}
      className="colorSelectOption"
      onClick={() => editor.chain().focus().setColor(color).run()}
      style={{ "--color": color }}
    ></span>
  ));
}
function renderBackgroundOptions(editor) {
  return colorList.map((color) => (
    <span
      key={color}
      className="colorSelectOption"
      onClick={() =>
        editor
          .chain()
          .focus()
          .setMark("textStyle", { backgroundColor: color })
          .run()
      }
      style={{ "--color": color }}
    ></span>
  ));
}

export default function TipTapEditor(props) {
  const [menuVisivel, setMenuVisivel] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      BackgroundColor,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (props.onChange) {
        props.onChange(html);
      }
    },
  });

  if (!editor) return <p>Carregando editor...</p>;

  return (
    <div className="menuEditor">
      <span className="menuLabel">
        <label>Texto</label>
        <input
          className="menuCheckboxInput"
          type="checkbox"
          name="menu"
          id={"menuCheckbox" + props.index}
          onChange={(e) => setMenuVisivel(!menuVisivel)}
        />
        <label
          className="menuCheckboxLabel"
          htmlFor={"menuCheckbox" + props.index}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </label>
      </span>
      <div
        className="menuBotoes"
        style={{ display: menuVisivel ? "flex" : "none" }}
      >
        {/* TÍTULO */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <i className="fa-solid fa-heading">
            <sub>1</sub>
          </i>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <i className="fa-solid fa-heading">
            <sub>2</sub>
          </i>
        </button>

        {/* NEGRITO */}
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <i className="fa-solid fa-bold"></i>
        </button>

        {/* ITALICO */}
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i className="fa-solid fa-italic"></i>
        </button>

        {/* Cor Texto  */}
        <button className="colorButton">
          <i className="fa-solid fa-droplet"></i>
          <div className="colorSelect">
            {renderColorOptions(editor)}
            <input
              type="color"
              onChange={(e) =>
                editor.chain().focus().setColor(e.target.value).run()
              }
              title="Escolher cor"
            />
          </div>
        </button>

        {/* COR DE FUNDO */}
        <button className="colorButton">
          <i className="fa-solid fa-fill-drip"></i>
          <div className="colorSelect">
            {renderBackgroundOptions(editor)}
            <input
              type="color"
              onChange={(e) =>
                editor
                  .chain()
                  .focus()
                  .setMark("textStyle", { backgroundColor: e.target.value })
                  .run()
              }
              title="Escolher cor de fundo"
            />
            <span
              onClick={(e) => {
                editor.chain().focus().unsetBackgroundColor().run();
              }}
            >
              <i className="fa-solid fa-eraser"></i>
            </span>
          </div>
        </button>
        {/* LISTA */}

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <i className="fa-solid fa-list"></i>
        </button>

        {/* LINK */}
        <button
          onClick={() => {
            const url = prompt("Digite o link:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <i className="fa-solid fa-link"></i>
        </button>

        {/* ALINHAMENTO */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <i className="fa-solid fa-align-left"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <i className="fa-solid fa-align-center"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <i className="fa-solid fa-align-right"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <i className="fa-solid fa-align-justify"></i>
        </button>
      </div>

      {/* EDITOR */}
      <EditorContent className="editorTipTap" editor={editor} />
    </div>
  );
}
