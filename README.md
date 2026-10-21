# Estoque da Obra

Controle do estoque de material da obra. Arquivo único, funciona offline, instala
no celular e no PC. Os dados ficam no navegador e, se você conectar, no seu
Google Drive (arquivo `estoque.json` na pasta "Controle de Estoque").

Endereço: https://fabianofca26-creator.github.io/Controle_estoque/

## Como funciona

- **Ajustes**: módulos (quantas casas tipo 1 e tipo 2), locais de armazenamento,
  importação da planilha de quantitativos (consumo por casa de cada material).
- **Compras**: o que precisa comprar → solicitação (com o número do Sienge) →
  pedido importado do PDF do Sienge, ligado à solicitação → recebimento total
  ou parcial. Item do pedido que o app não reconhece você liga a um material
  uma vez; ele lembra nos próximos pedidos.
- **Saída**: pra um módulo ou transferência pra outra obra.
- **Conferir**: conta o que tem em cada local; a diferença vira ajuste e o
  material marca a data da conferência.

Precisa comprar = falta usar nos módulos − estoque − pedidos a chegar −
solicitações ainda sem pedido.

## Google Drive

Pode usar o mesmo Client ID do app de Assistência (a origem
`https://fabianofca26-creator.github.io` já está autorizada). Cole em
Ajustes → Google Drive → Conectar e sincronizar. A versão mais recente ganha;
é feito pra uma pessoa só.

## Testes

- `index.html?teste=1` testa as contas (saldo, falta, a chegar, comprar).
- `node parser.test.mjs pedido.pdf planilha.xlsx` testa a leitura dos PDFs do
  Sienge e da planilha (precisa `npm i pdfjs-dist@4.10.38 xlsx@0.18.5`).
