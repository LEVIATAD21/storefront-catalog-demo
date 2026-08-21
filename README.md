# Catálogo de Loja Digital

> **Demo de portfólio independente.** Não representa trabalho contratado, dados de cliente, integração produtiva ou resultado comercial.

Demo de vitrine de produtos com filtro de categoria, modal de detalhes, carrinho persistido no navegador e fluxo local de revisão de pedido. Não há pagamento, cobrança, entrega, conta de usuário ou integração com terceiros.

## Funcionalidades demonstradas

- Filtro por categoria com atualização imediata da vitrine.
- Modal de detalhes com descrição e variações do produto fictício.
- Carrinho local com adição, remoção e total calculado.
- Persistência do carrinho em `localStorage`, com recuperação segura de dados inválidos.
- Fluxo de revisão de pedido com confirmação explicitamente demonstrativa e limpeza do carrinho.

## Executar e revisar

```bash
npm test
npm run review
```

Os testes cobrem filtro, localização de produto, adição, remoção, total e persistência segura. A revisão estática confere os arquivos obrigatórios, a identificação de demo, a ausência de arquivos de ambiente, a ausência de execução dinâmica, a ausência de chamadas externas e a não inclusão de processadores de pagamento.

## Limites

Dados, contatos e números apresentados pela interface são estritamente ilustrativos. Integrações, pagamento, hospedagem, banco de dados e dados de terceiros exigem escopo e autorização próprios.
