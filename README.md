# Estoque da Obra

Controle do estoque de material da obra. Arquivo único, funciona offline, instala
no celular e no PC. Os dados ficam no navegador e, se você conectar, no seu
Google Drive (arquivo `estoque.json` na pasta "Controle de Estoque").

Endereço: https://fabianofca26-creator.github.io/Controle_estoque/

## Como funciona

- **Ajustes**: módulos (quantas casas tipo 1 e tipo 2), fornecedores com prazo
  de entrega, locais de armazenamento, ponto de partida do controle.
- **Obra**: programação por quinzena (1 a 15, 16 ao fim do mês): em quantas
  casas cada serviço roda em cada quinzena, separado em rodando agora, próximos
  15 e 30 dias, futuro e inativos. O que não foi feito passa pra quinzena atual
  como atrasado. Cada serviço tem
  os materiais por casa (tipo 1 e 2) e o serviço que vem antes. O andamento é
  um número por serviço e módulo: quantas casas já estão prontas.
- **Compras**: indicação do que comprar → solicitação (com o número do Sienge)
  → pedido importado do PDF do Sienge, ligado à solicitação → recebimento
  total ou parcial. Item do pedido que o app não reconhece você liga a um
  material uma vez; ele lembra nos próximos pedidos.
- **Saída**: pra um módulo (serviço opcional) ou transferência pra outra obra.
- **Conferir**: conta o que tem em cada local; a diferença vira ajuste e o
  material marca a data da conferência. A primeira conferência é o estoque
  inicial.

Indicação de compra: casas programadas × quantidade por casa, por quinzena; a
data limite é o início da quinzena menos o prazo do fornecedor. Casas sem
programação só aparecem em "Tudo que falta". O que tem em estoque, a chegar e
solicitado é reservado primeiro pra quinzena mais próxima; só o que fica
descoberto aparece, filtrado por horizonte, módulo, etapa e serviço. A ordem
dos serviços ("vem depois de") só serve pro aviso de casas não liberadas.

## Google Drive

Pode usar o mesmo Client ID do app de Assistência (a origem
`https://fabianofca26-creator.github.io` já está autorizada). Cole em
Ajustes → Google Drive → Conectar e sincronizar. A versão mais recente ganha;
é feito pra uma pessoa só.

## Testes

- `index.html?teste=1` testa as contas (saldo, falta, a chegar, comprar).
- `node parser.test.mjs pedido.pdf planilha.xlsx` testa a leitura dos PDFs do
  Sienge e da planilha (precisa `npm i pdfjs-dist@4.10.38 xlsx@0.18.5`).
