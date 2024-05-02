# Cypress com TypeScript, Allure, Git Actions

** Exemplo de estrutura de automação de testes de WEB, feita com Cypress em TypeScript, e Allure fornece o relatório dos testes. **

- [Instalação e execução](#instalação-e-execução)
  - [Pré-requisitos](#pré-requisitos)
  - [Clonando o repositório](#clonando-o-repositório)
- [Testes](#testes-de-api)
  - [Pré-requisito](#pré-requisito)
  - [Executando os testes](#executando-os-testes)
  - [Resultado](#resultado)
- [Sobre o projeto](#sobre-o-projeto)
  - [Dependências utilizadas](#dependências-utilizadas)
  - [Estrutura de diretórios](#estrutura-de-diretórios)
  - [Ambiente](#ambiente)
- [Lint](#lint)

---

## Instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/download/) e [Node.js](https://nodejs.org/en/download/) instalados.

### Clonando o repositório

Todos os comandos abaixo são feitos no terminal

**Passo 1** - Faça um clone do repositório e acesse o diretório criado pelo clone.

```sh
git https://github.com/reinaldorossetti/cypress-typescript-allure-report.git
cd cypress-typescript-allure-report
```

**Passo 2** - Instale as dependências do projeto:

```sh
npm install
```
### Testes de API

**Passo 3** - Executando o projeto e gerando o Relatório:

#### Executando os testes

Caso queira apenas rodar os testes, sem precisar subir ambiente, execute o seguinte comando:

> Os testes serão executados em cima da página [VR](https://loja.vr.com.br/)

```sh
npm run tests
```
Para exibir o Report (Foi utilizado o Allure Report):
```sh
npm run report
```

As variáveis por ambiente estão definidos dentro dos arquivos cypress.config.ts

#### Resultado

Com allure report:
```sh
https://reinaldorossetti.github.io/cypress-typescript-allure-report/allure-report/#suites/
```
Actions:
https://github.com/reinaldorossetti/cypress-typescript-allure-report/actions

**Passo 4** - Como funciona a Estrutura do Projeto:

As dependências estão definidas no [package.json](./package.json).

### Estrutura de diretórios

```
cypress-typescript-allure-report/  

 ├─ e2e/ 
 |   ├─ tests /
 |       └─ virtual_shopping_cart.cy.ts 
 |   └─ resources/  
     ├─ support/  
 |   ├─ commands.ts  
 |   ├─ e2e.ts  
 |   └─ index.d.js  
 ├─ cypress.config.ts  
 ├─ cypress.env.json  
 ├─ package.json  
 └─ tsconfig.json  
```

## Allure report  
Podemos adicionar variaveis e severidade dos testes para ser exibidos no report.
Tipos de severidade que podemos usar os tipos: blocker, critical, minor, trivial.O tipo normal é padrão, não precisando ser adicionada.
Nos testes precisamos adicionar os comandos abaixos:
````js
    allureMocha.allure.parameter('body', String(response.text))
    allureMocha.allure.severity('minor')
````

### Referências:  
[Cypress](https://www.cypress.io)
[Allure](https://github.com/Shelex/cypress-allure-plugin)  
