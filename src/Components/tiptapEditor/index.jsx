import React from "react";
import "./tiptapEditor.estilos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BackgroundColor, TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
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

export default function TipTapEditor(props) {
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
      TableRow,
      TableHeader,
      TableCell,
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
    <div
      className="menuEditor"
    >
      <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <i className="fa-solid fa-bold"></i>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i class="fa-solid fa-italic"></i>
        </button>
        <button className="colorButton">
          <i className="fa-solid fa-droplet"></i>
          <div className="colorSelect">
            {renderColorOptions(editor)}
            <input
              type="color"
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              style={{
                width: 24,
                height: 24,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              title="Escolher cor"
            />
          </div>
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <i class="fa-solid fa-list"></i>
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setLink({ href: "https://example.com" })
              .run()
          }
        >
          <i class="fa-solid fa-link"></i>
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <i class="fa-solid fa-table"></i>
        </button>
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

      <EditorContent
        editor={editor}

      />
    </div>
  );
}
