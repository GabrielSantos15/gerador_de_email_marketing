import { useState } from "react";
import "./tiptapEditor.estilos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BackgroundColor, TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import TextAlign from "@tiptap/extension-text-align";

const colorList = [
  "#cc0000ff",
  "#00c900ff",
  "#1500ceff",
  "#FFA500",
  "#b700ffff",
  "#000000",
  "#ffffff",
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
      Color,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      BulletList,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p></p>",
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
      <span>
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
          <i class="fa-solid fa-pen-to-square"></i>
        </label>
      </span>
      <div
        className="menuBotoes"
        style={{ display: menuVisivel ? "flex" : "none" }}
      >
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
          </div>
        </button>

        {/* NEGRITO */}
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <i className="fa-solid fa-bold"></i>
        </button>

        {/* ITALICO */}
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i class="fa-solid fa-italic"></i>
        </button>
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

        {/* LISTA */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <i class="fa-solid fa-list"></i>
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
      </div>

      {/* EDITOR */}
      <EditorContent className="editorTipTap" editor={editor} />
    </div>
  );
}
