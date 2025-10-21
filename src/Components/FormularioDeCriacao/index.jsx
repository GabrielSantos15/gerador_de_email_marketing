import { useEffect, useState } from "react";
import "./formulario-criacao.estilos.css";
import ButtonAdd from "../ButtonAdd";
import EditorElemento from "../EditorElemento";
import Input from "../Input";
import EditorImagem from "../EditorImagem";

import DOMPurify from "dompurify";
import { DndContext, DragOverlay } from "@dnd-kit/core";

export default function FormularioCriacao({
  elementos,
  setElementos,
  setHtml,
  colorBg,
  setColorBg,
  imageBg,
  setimageBg,
  mostrarFormularioCriacao,
}) {
  const [dragActiveId, setDragActiveId] = useState(null);

  useEffect(() => {
    let imgContador = 0;
    let rows = [];
    let tempRow = [];

    elementos.forEach((el) => {
      let html = "";

      switch (el.tipo) {
        case "texto":
          html = `<p>${el.texto}</p>`;
          break;
        case "card":
          html = `<div style="background-color: ${el.corFundo};border-radius: 5px;padding: 10px;box-shadow: 5px 5px 10px #0000003d;"><p>${el.texto}</p></div>`;
          break;
        case "imagem":
          imgContador++;
          html = `<img style="width:100%; max-width:100%;" src="cid:imagem${imgContador}"/>`;
          break;
        case "botao":
          html = `<a href="${
            el.link
          }" target="_blank" style="text-align:center;text-decoration: none"><button style="display:block;margin:0 auto;color:${
            el.corTexto
          };background-color:${el.corFundo};border-radius:${
            el.arredondamento + "px"
          };padding:5px 10px;cursor:pointer;font-weight:bold;border:none;font-size:21px;box-shadow:5px 5px 10px #0000003d;text-align:center">${
            el.texto
          }</button></a>`;
          break;
        case "banner":
          imgContador++;
          html = `</td></tr></table><img style="width:100%" src="cid:imagem${imgContador}"/><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>`;
          break;
        case "html":
          html = `${el.codigo}`;
          break;
      }

      // Se largura 50%, adiciona à linha temporária
      if (el.largura === "small") {
        tempRow.push(
          `<td width="50%" valign="center" style="padding: 10px">${html}</td>`
        );
        // Se já tem dois, fecha a linha
        if (tempRow.length === 2) {
          rows.push(`<tr>${tempRow.join("")}</tr>`);
          tempRow = [];
        }
      } else {
        // Se houver célula pendente, fecha a linha antes
        if (tempRow.length > 0) {
          rows.push(`<tr>${tempRow.join("")}</tr>`);
          tempRow = [];
        }
        // Elemento 100% ocupa linha inteira
        rows.push(
          `<tr><td width="100%;" valign="center" colspan="2" style="padding: 10px">${html}</td></tr>`
        );
      }
    });

    // Se sobrou célula 50% sozinha, completa a linha
    if (tempRow.length === 1) {
      tempRow.push('<td width="50%" style="padding: 10px"></td>');
      rows.push(`<tr style="padding: 40x 20px">${tempRow.join("")}</tr>`);
    }

    // Monta a tabela
    let conteudoHtml = `<table width="100%  cellpadding="0" cellspacing="0" border="0">${rows.join(
      ""
    )}</table>`;

    conteudoHtml = conteudoHtml.replace(/<tr[^>]*>\s*<\/tr>/g, "");

    // Remove <tr> vazios
    conteudoHtml = conteudoHtml.replace(
      /<tr[^>]*>(\s*<td[^>]*>\s*<\/td>)+\s*<\/tr>/g,
      ""
    );
    // Remove <table> vazios
    conteudoHtml = conteudoHtml.replace(/<table[^>]*><\/table>/g, "");

    let htmlFinal = `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React</title>
      
    </head>
    <body>
      <div style="font-family: system-ui, Helvetica, sans-serif; max-width: 800px; margin: auto">
        <div style="background-color: ${colorBg}">
        ${DOMPurify.sanitize(conteudoHtml)}
        </div>
      </div>
    </body>
  </html>
      `;

    setHtml(htmlFinal);
  }, [elementos, colorBg, setHtml]);

  const adicionarElemento = (elemento) => {
    const atualizados = elemento ? [...elementos, elemento] : elementos;
    setElementos(atualizados);
  };

  const removerElemento = (idElemento) => {
    // Filtra o array, mantendo apenas os elementos com ID  diferente
    const atualizados = elementos.filter((el) => el.id !== idElemento);
    setElementos(atualizados);
  };

  const atualizarElemento = (idParaAtualizar, novosCampos) => {
    const atualizados = elementos.map((el) =>
      el.id === idParaAtualizar ? { ...el, ...novosCampos } : el
    );
    setElementos(atualizados);
  };

  return (
    <DndContext
      onDragStart={(event) => setDragActiveId(event.active.id)} // Define o elemento que está sendo arrastado
      onDragEnd={(event) => {
        console.log("Drag End", event);
        const { active, over } = event;

        setDragActiveId(null); // Limpa o elemento ativo
        if (!over || active.id === over.id) return; // verifica se é o mesmo elemento ou se não há destino

        const oldIndex = elementos.findIndex((el) => el.id === active.id);
        const newIndex = elementos.findIndex((el) => el.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          // Reordena os elementos no array
          const atualizados = [...elementos];
          const [itemMovido] = atualizados.splice(oldIndex, 1);
          atualizados.splice(newIndex, 0, itemMovido);
          setElementos(atualizados);
        }
      }}
    >
      <section
        className={`formulario-criacao ${
          mostrarFormularioCriacao ? "selecionado" : ""
        }`}
      >
        <label className="label-Alternar-container" htmlFor="formularioSeletor">
          {mostrarFormularioCriacao ? "Criador" : "Envio"}
        </label>
        <article className="config-gerais">
          <span>
            <label htmlFor="input-cor-fundo">Cor de Fundo</label>
            <Input
              id="input-cor-fundo"
              type="color"
              value={colorBg}
              onChange={(e) => setColorBg(e.target.value)}
            />
          </span>
        </article>
        <div className="elementos-lista">
          {elementos.map((el) => (
            <EditorElemento
              key={el.id}
              id={el.id}
              elemento={el}
              atualizarElemento={atualizarElemento}
              removerElemento={() => removerElemento(el.id)}
            />
          ))}
        </div>
        <ButtonAdd functionOnClick={adicionarElemento} />
        <DragOverlay>
          {dragActiveId ? (
            <EditorElemento
              elemento={elementos.find((el) => el.id === dragActiveId)}
              //funções vazias, não precisa atualizar ou remover enquanto arrasta
              atualizarElemento={() => {}}
              removerElemento={() => {}}
            />
          ) : null}
        </DragOverlay>
      </section>
    </DndContext>
  );
}
