# Catálogo de Loja Digital

> **Demo de portfólio independente.** Não representa trabalho contratado, dados de cliente, integração produtiva ou resultado comercial.

Demo de vitrine de produtos com filtro de categoria, modal de detalhes, carrinho persistido no navegador e fluxo local de revisão de pedido. Não há pagamento, cobrança, entrega, conta de usuário ou integração com terceiros.

## Funcionalidades demonstradas

- Filtro por categoria com atualização imediata da vitrine
- Modal de detalhes com descrição e variações do produto fictício
- Carrinho local com adição, remoção e total calculado
- Persistência do carrinho em `localStorage`, com recuperação segura de dados inválidos
- Fluxo de revisão de pedido com confirmação explicitamente demonstrativa e limpeza do carrinho
- Design responsivo para dispositivos móveis
- Interface acessível com suporte a leitores de tela

## Segurança

- Dados fictícios: nenhum dado real de clientes ou produtos é armazenado
- Sem requisições externas: toda a aplicação funciona offline
- Sem armazenamento sensível: apenas dados de demonstração em localStorage
- Validação de entrada: dados do carrinho são validados antes da exibição
- Sem execução dinâmica: código é estático e auditável

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis CSS
- JavaScript ES6+ (módulos nativos)
- Node.js para testes e revisão

## Estrutura do Projeto

```
storefront-catalog-demo/
├── index.html          # Página principal
├── styles.css          # Estilos da aplicação
├── app.mjs             # Lógica principal e componentes
├── main.mjs            # Ponto de entrada
├── tests.mjs           # Testes unitários
├── review.mjs          # Revisão estática de código
├── package.json        # Configuração do projeto
├── .gitignore          # Arquivos ignorados pelo Git
├── LICENSE             # Licença MIT
└── README.md           # Este arquivo
```

## Executar e revisar

```bash
# Instalar dependências (opcional - não há dependências externas)
npm install

# Executar testes
npm test

# Executar revisão estática
npm run review
```

## Testes

Os testes cobrem:
- Filtro por categoria
- Localização de produto
- Adição e remoção do carrinho
- Cálculo de total
- Persistência segura de dados

## Revisão Estática

A revisão confere:
- Presença de todos os arquivos obrigatórios
- Identificação clara como demo
- Ausência de arquivos de ambiente (.env)
- Ausência de execução dinâmica (eval, Function)
- Ausência de chamadas externas (fetch, XMLHttpRequest)
- Não inclusão de processadores de pagamento

## Limites

- Dados, contatos e números são estritamente ilustrativos
- Integrações, pagamento, hospedagem e banco de dados não estão incluídos
- Projeto destinado a demonstração técnica para portfólio

## Autor

**Kawã Silva dos Santos**
- GitHub: [@leviatad21](https://github.com/LEVIATAD21)
- Estudante de Segurança da Informação

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
