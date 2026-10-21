// Testa a leitura do pedido do Sienge com os PDFs reais (que NÃO vão pro
// repositório). Uso:
//   npm i pdfjs-dist@4.10.38
//   node parser.test.mjs pedido1.pdf pedido2.pdf ...
import fs from "fs";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

const html = fs.readFileSync(new URL("./index.html", import.meta.url), "utf8");
const src = html.split("// <parser>")[1].split("// </parser>")[0];
const { lerPedido } = new Function(src + "; return { lerPedido };")();

for (const f of process.argv.slice(2)) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync(f)), verbosity: 0 }).promise;
  const pags = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const tc = await (await doc.getPage(i)).getTextContent();
    pags.push(tc.items.map(t => ({ x: t.transform[4], y: t.transform[5], s: t.str })));
  }
  const p = lerPedido(pags);
  console.log("=====", f);
  console.log({ ...p, itens: p.itens.length });
  p.itens.forEach(i => console.log(`  ${i.cod} | ${i.nome} | ${i.comp} | ${i.qtd} ${i.un} | ${i.prev}`));
}
