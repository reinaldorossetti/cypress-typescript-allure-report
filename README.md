# 🧪 Cypress + TypeScript + Allure Report

[![Cypress](https://img.shields.io/badge/Cypress-12.17.4-04C38E?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-Plugin-FF6C37?logo=qameta-allure&logoColor=white)](https://allurereport.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)](https://github.com/reinaldorossetti/cypress-typescript-allure-report/actions)

Framework profissional de automação de testes End-to-End (E2E) desenvolvido em **Cypress** utilizando **TypeScript**, suporte a relatórios detalhados com **Allure Report** e esteira de integração contínua (CI/CD) via **GitHub Actions**.

---

## 📋 Sumário
1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Tecnologias e Bibliotecas](#-tecnologias-e-bibliotecas)
3. [Estrutura do Projeto](#-estrutura-do-projeto)
4. [Instalação e Configuração](#-instalação-e-configuração)
5. [Execução dos Testes](#-execução-dos-testes)
   - [Execução Global por Navegador](#execução-global-por-navegador)
   - [Execução Separada por Feature](#execução-separada-por-feature)
   - [Modo Interativo (Cypress Runner)](#modo-interativo-cypress-runner)
6. [Relatórios de Teste (Allure Report)](#-relatórios-de-teste-allure-report)
   - [Geração Local](#geração-local)
   - [Relatórios no GitHub Actions e GitHub Pages](#relatórios-no-github-actions-e-github-pages)
7. [Boas Práticas de QA Implementadas](#-boas-práticas-de-qa-implementadas)

---

## 🚀 Sobre o Projeto
O projeto visa garantir a qualidade e regressão automatizada de aplicações Web através de cenários BDD/E2E estritamente tipados com TypeScript. Ele conta com geração dinâmica de massa de dados (Faker), organização em Page Objects / Elements, comandos customizados no Cypress e relatórios visuais ricos com suporte a evidências e severidades pelo Allure Report.

---

## 🛠️ Tecnologias e Bibliotecas
- **[Cypress](https://www.cypress.io/)**: Framework de automação E2E moderno e rápido.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estrita para maior segurança e manutenibilidade.
- **[@shelex/cypress-allure-plugin](https://github.com/Shelex/cypress-allure-plugin)**: Integração para relatórios do Allure.
- **[@faker-js/faker](https://fakerjs.dev/)**: Geração dinâmica de dados de teste (massa de dados).
- **GitHub Actions**: Integração contínua e publicação automática dos relatórios no GitHub Pages.

---

## 📁 Estrutura do Projeto

```
cypress-typescript-allure-report/
├── .github/
│   └── workflows/
│       ├── main.yml                     # Workflow CI/CD (Chrome + Allure + Deploy GH-Pages)
│       └── ci.yml                       # Workflow de testes em múltiplos navegadores
├── cypress/
│   ├── e2e/
│   │   └── features/                    # Suítes de testes divididas por funcionalidades (features)
│   │       ├── shopping_cart/
│   │       │   ├── elements/            # Seletores e elementos da tela do carrinho
│   │       │   └── virtual_shopping_cart.cy.ts
│   │       ├── vertem_cadastro/
│   │       │   ├── elements/            # Seletores e interfaces de cadastro da Vertem
│   │       │   ├── factory/             # Geração de dados de teste via Faker (VertemCadastroFactory)
│   │       │   └── vertem_cadastro.cy.ts
│   │       └── shadow_dom/
│   │           ├── elements/            # Seletores do formulário dentro da árvore Shadow DOM
│   │           ├── factory/             # Geração de dados dinâmicos via Faker (ShadowDomFactory)
│   │           └── shadow_dom.cy.ts
│   └── support/
│       ├── commands.ts                  # Custom Commands do Cypress (inclui Shadow DOM)
│       ├── e2e.ts                       # Setup global e imports do Cypress/Allure
│       └── index.d.ts                   # Declaração dos tipos dos Custom Commands
├── cypress.config.ts                    # Configuração principal do Cypress (includeShadowDom: true)
├── cypress.env.json                     # Variáveis de ambiente locais
├── package.json                         # Dependências e scripts de execução
└── tsconfig.json                        # Configurações do compilador TypeScript
```

---

## ⚙️ Instalação e Configuração

### Pré-requisitos
- **[Node.js](https://nodejs.org/)** (v18 ou superior)
- **[Git](https://git-scm.com/)**
- *(Opcional)* **[Allure CLI](https://allurereport.org/docs/install/)** para compilação e abertura local dos relatórios.

### 1. Clonar o repositório
```bash
git clone https://github.com/reinaldorossetti/cypress-typescript-allure-report.git
cd cypress-typescript-allure-report
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo na raiz do projeto chamado `cypress.env.json` com o seguinte formato:

```json
{
  "BASE_URL": "https://loja.vr.com.br/",
  "USER": "usuario_exemplo",
  "PASSWORD": "senha_exemplo"
}
```

---

## 🧪 Execução dos Testes

### Execução Global por Navegador
Para executar todos os testes da suíte no navegador desejado via CLI:

```bash
# Executar todos os testes no Google Chrome
npm run tests-chrome

# Executar todos os testes no Microsoft Edge
npm run tests-edge

# Executar todos os testes no Mozilla Firefox
npm run tests-firefox
```

### Execução Separada por Feature

#### 🛍️ Feature: Shopping Cart (Carrinho de Compras)
```bash
npm run test:shopping-cart
```
*Execução direta via Cypress CLI:*
```bash
npx cypress run --spec "cypress/e2e/features/shopping_cart/**/*.cy.ts" --browser chrome
```

#### 📝 Feature: Vertem Cadastro (Fale com um Especialista)
```bash
npm run test:vertem-cadastro
```
*Execução direta via Cypress CLI:*
```bash
npx cypress run --spec "cypress/e2e/features/vertem_cadastro/**/*.cy.ts" --browser chrome
```

#### 👥 Feature: Shadow DOM (Sign Up Form em Shadow DOM)
```bash
npm run test:shadow-dom
```
*Execução direta via Cypress CLI:*
```bash
npx cypress run --spec "cypress/e2e/features/shadow_dom/**/*.cy.ts" --browser chrome
```

### Modo Interativo (Cypress Runner)
Para abrir a interface gráfica do Cypress e acompanhar a execução em tempo real:

```bash
npm run open
```

---

## 📊 Relatórios de Teste (Allure Report)

### Geração Local
Após a execução dos testes via CLI (`npm run tests-*` ou `npm run test:<feature>`), os dados brutos do relatório são salvos na pasta `allure-results`.

Para gerar e abrir o relatório Allure interativo localmente no seu navegador:

```bash
npm run report
```

### Relatórios no GitHub Actions e GitHub Pages

A cada push ou pull request na branch `main`, a esteira do GitHub Actions roda a suíte de testes e realiza o deploy do relatório atualizado no **GitHub Pages**.

- 🌐 **Relatório Online (GitHub Pages)**:
  👉 [https://reinaldorossetti.github.io/cypress-typescript-allure-report/allure-report/#suites/](https://reinaldorossetti.github.io/cypress-typescript-allure-report/allure-report/#suites/)

- ⚙️ **Workflows e Execuções (GitHub Actions)**:
  👉 [https://github.com/reinaldorossetti/cypress-typescript-allure-report/actions](https://github.com/reinaldorossetti/cypress-typescript-allure-report/actions)

- 📦 **Artefatos da Esteira**:
  Em cada execução na aba Actions, é possível realizar o download do artefato zipado `allure-report` ou das evidências de tela (`screenshots`).

---

## 🛡️ Boas Práticas de QA Implementadas

- **TypeScript Estrito**: Tipagem explícita de elementos, interfaces de dados e Custom Commands para mitigar erros em tempo de desenvolvimento.
- **Data Factory Pattern**: Uso da biblioteca `@faker-js/faker` para geração desacoplada e dinâmica de massas de dados de teste (ex: `VertemCadastroFactory`).
- **Page Objects & Elements**: Separação clara entre seletores de página, modelos de dados e lógica dos specs.
- **Custom Commands Reutilizáveis**: Encapsulamento de fluxos recorrentes em `cypress/support/commands.ts`.
- **Relatórios Ricos com Allure**: Categorização de steps (`cy.allure().step()`), severidades e capturas automáticas de evidências em falhas.
