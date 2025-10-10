import { useState, useEffect } from "react";
import "./formulario-criacao.estilos.css";
import ButtonAdd from "../ButtonAdd";
import EditorElemento from "../EditorElemento";
import Input from "../Input";
import DOMPurify from "dompurify";

export default function FormularioCriacao({
  elementos,
  setElementos,
  setHtml,
  images,
  SetImage,
}) {
  const [colorBg, setColorBg] = useState("#eeeeee");
  const [templateEmail, setTemplate] = useState("padrao");

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
          rows.push(`<tr >${tempRow.join("")}</tr>`);
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
      tempRow.push('<td width="50%"></td>');
      rows.push(`<tr>${tempRow.join("")}</tr>`);
    }

    // Monta a tabela
    let conteudoHtml = `<table width="100%  cellpadding="0" cellspacing="0" border="0">${rows.join(
      ""
    )}</table>`;

    conteudoHtml = conteudoHtml.replace(/<tr[^>]*>\s*<\/tr>/g, "");

    // Remove <tr> que só tem <td> vazios
    conteudoHtml = conteudoHtml.replace(
      /<tr[^>]*>(\s*<td[^>]*>\s*<\/td>)+\s*<\/tr>/g,
      ""
    );

    let htmlFinal = `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React</title>
      <style>
        body, table, tr, td, h1, h2, h3, h4, h5, h6, p, img {
        color:"red";
          margin: 0;
          padding: 0;
          border: 0;
        }
      </style>
    </head>
    <body>
      <div style="font-family: system-ui, Helvetica, sans-serif; ${tamplateGerador(
        templateEmail
      )}; max-width: 800px; margin: auto;">
        <div style="background-color: ${colorBg};">
        ${DOMPurify.sanitize(conteudoHtml)}
        </div>
      </div>
    </body>
  </html>
      `;

    setHtml(htmlFinal);
  }, [elementos, colorBg, setHtml, templateEmail]);

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
    <section className="formulario-criacao">
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
        <span>
          <label htmlFor="input-cor-fundo">Modelo</label>
          <select onChange={(e) => setTemplate(e.target.value)}>
            <option value="padrao">Padrão</option>
            <option value="corporativo">Corporativo</option>
            <option value="seguranca">Segurança</option>
            <option value="festa">Festa</option>
          </select>
        </span>
      </article>
      <div className="elementos-lista">
        {elementos.map((el) => (
          <EditorElemento
            key={el.id}
            elemento={el}
            atualizarElemento={atualizarElemento}
            // Passamos o ID do elemento para a função de remoção
            removerElemento={() => removerElemento(el.id)}
          />
        ))}
      </div>

      <ButtonAdd functionOnClick={adicionarElemento} />
    </section>
  );

  function tamplateGerador(template) {
    switch (template) {
      case "padrao":
        return "";
      case "corporativo":
        return `padding: 20px; box-sizing: border-box; margin: auto; font-family: Arial, sans-serif; background-color: #f9f9f9;`;
      case "seguranca":
        return `padding: 20px; box-sizing: border-box; margin: auto; font-family: 'Courier New', Courier, monospace; color: #000; background-color: #d80606ff; border: 5px solid #000; background-image: repeating-linear-gradient( 45deg, #ffffff33, #ffffff33 10px, #00000033 10px, #00000033 20px );`;
      case "festa":
        return `padding: 20px; box-sizing: border-box; margin: auto; font-family: 'Comic Sans MS', cursive, sans-serif; background-color: #ff69b4;background-image: url(https://www.shutterstock.com/image-vector/color-gradient-background-abstract-orange-600nw-2480677725.jpg);`;
      default:
        return "padding: 20px; box-sizing: border-box;";
    }
  }
}
