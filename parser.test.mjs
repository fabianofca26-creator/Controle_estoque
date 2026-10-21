// Testa a leitura do pedido do Sienge e da planilha de quantitativos com os
// arquivos reais (que NÃO vão pro repositório). Uso:
//   npm i pdfjs-dist@4.10.38 xlsx@0.18.5
//   node parser.test.mjs pedido1.pdf pedido2.pdf ... [quantitativo.xlsx]
import fs from "fs";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import XLSX from "xlsx";

const html = fs.readFileSync(new URL("./index.html", import.meta.url), "utf8");
const src = html.split("// <parser>")[1].split("// </parser>")[0];
const { lerPedido, lerQuantitativo } = new Function(src + "; return { lerPedido, lerQuantitativo };")();

for (const f of process.argv.slice(2)) {
  if (f.endsWith(".xlsx")) {
    const wb = XLSX.read(fs.readFileSync(f));
    const linhas = lerQuantitativo(wb.SheetNames.map(n => ({ nome: n, linhas: XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, blankrows: false }) })));
    console.log("=====", f, linhas.length, "linhas");
    console.log(Object.entries(Object.groupBy(linhas, l => l.aba)).map(([a, ls]) => `${a}: ${ls.length}`).join("\n"));
    console.log(linhas.slice(0, 3));
    continue;
  }
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
