// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { HomePage } from "../e2e/features/shopping_cart/elements/home_page.elements"

/**
 * Adicionando a função para navegar até a tela de cartões.
 * //cy.contains('Compre online').should('be.visible').click()
 */
Cypress.Commands.add('DadoQueEstejaNaTelaDeCartoes', () => {
    cy.visit('/');
    // cria um stub ou seja uma chamada fake, para não ter que abrir uma nova aba.
    const stub = cy.stub().as('open')
    cy.on('window:before:load', (win) => {
        cy.stub(win, 'open').callsFake(stub)
    })
    cy.contains(HomePage.TXT_CAMPRA_ONLINE).should('be.visible').click()
    // intercepta a chamada de uma nova aba.
    cy.get('@open').should('have.been.calledOnce')
    // muda a url para seguir na nova tela, o cypress identifica o mesmo dominio,
    // sendo assim não é possivel fazer cy.origin
    cy.visit(Cypress.env("BASE_URL"));
    cy.contains(HomePage.TXT_MESSAGE).should('be.visible')
    cy.get(HomePage.BTN_TERMS).click()
    cy.get(HomePage.BTN_CLOSE).click()
    cy.contains(HomePage.TXT_CARTOES).should('be.visible').click()
})

Cypress.Commands.add('GerarCNPJ' as any, () => {
    let create_array = (total, numero) => Array.from(Array(total), () => number_random(numero));
    let number_random = (number) => (Math.round(Math.random() * number));
    let mod = (dividendo, divisor) => Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
    
    let total_array = 8;
    let n = 9;
    let [n1, n2, n3, n4, n5, n6, n7, n8] = create_array(total_array, n);
    let n9 = 0;
    let n10 = 0;
    let n11 = 0;
    let n12 = 1;
    
    let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;
    
    let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;
    
    return `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`;
      
})

import { VertemCadastroPage, VertemCadastroData } from "../e2e/features/vertem_cadastro/elements/vertem_cadastro.elements"

Cypress.Commands.add('DadoQueEstejaNaTelaFaleComEspecialistaVertem', () => {
    cy.visit(VertemCadastroPage.URL);
    cy.get(VertemCadastroPage.INPUT_NOME).should('be.visible');
})

Cypress.Commands.add('PreencherFormularioVertem', (dados: Partial<VertemCadastroData>) => {
    if (dados.nome !== undefined) {
        if (dados.nome) cy.get(VertemCadastroPage.INPUT_NOME).clear().type(dados.nome);
        else cy.get(VertemCadastroPage.INPUT_NOME).clear();
    }
    if (dados.email !== undefined) {
        if (dados.email) cy.get(VertemCadastroPage.INPUT_EMAIL).clear().type(dados.email);
        else cy.get(VertemCadastroPage.INPUT_EMAIL).clear();
    }
    if (dados.telefone !== undefined) {
        if (dados.telefone) cy.get(VertemCadastroPage.INPUT_TELEFONE).clear().type(dados.telefone);
        else cy.get(VertemCadastroPage.INPUT_TELEFONE).clear();
    }
    if (dados.empresa !== undefined) {
        if (dados.empresa) cy.get(VertemCadastroPage.INPUT_EMPRESA).clear().type(dados.empresa);
        else cy.get(VertemCadastroPage.INPUT_EMPRESA).clear();
    }
    if (dados.segmento !== undefined) {
        if (dados.segmento) cy.get(VertemCadastroPage.SELECT_SEGMENTO).select(dados.segmento);
    }
    if (dados.faturamento !== undefined) {
        if (dados.faturamento) cy.get(VertemCadastroPage.SELECT_FATURAMENTO).select(dados.faturamento);
    }
    if (dados.cargo !== undefined) {
        if (dados.cargo) cy.get(VertemCadastroPage.SELECT_CARGO).select(dados.cargo);
    }
    if (dados.mensagem !== undefined) {
        if (dados.mensagem) cy.get(VertemCadastroPage.TEXTAREA_MENSAGEM).clear().type(dados.mensagem);
        else cy.get(VertemCadastroPage.TEXTAREA_MENSAGEM).clear();
    }
    if (dados.aceite) {
        cy.get(VertemCadastroPage.CHECKBOX_ACEITE).check({ force: true });
    }
})

import { ShadowDomPage, ShadowSignUpFormData, ShadowDomExampleData } from "../e2e/features/shadow_dom/elements/shadow_dom.elements"

Cypress.Commands.add('DadoQueEstejaNaTelaShadowDom', () => {
    cy.visit(ShadowDomPage.URL);
    cy.get(ShadowDomPage.SIGNUP_HOST).should('exist');
})

Cypress.Commands.add('PreencherFormularioSignUpShadowDom', (dados: Partial<ShadowSignUpFormData>) => {
    cy.get(ShadowDomPage.SIGNUP_HOST).shadow().within(() => {
        if (dados.username !== undefined) {
            if (dados.username) cy.get(ShadowDomPage.INPUT_USERNAME).clear().type(dados.username);
            else cy.get(ShadowDomPage.INPUT_USERNAME).clear();
        }
        if (dados.email !== undefined) {
            if (dados.email) cy.get(ShadowDomPage.INPUT_EMAIL).clear().type(dados.email);
            else cy.get(ShadowDomPage.INPUT_EMAIL).clear();
        }
        if (dados.password !== undefined) {
            if (dados.password) cy.get(ShadowDomPage.INPUT_PASSWORD).clear().type(dados.password);
            else cy.get(ShadowDomPage.INPUT_PASSWORD).clear();
        }
        if (dados.confirmPassword !== undefined) {
            if (dados.confirmPassword) cy.get(ShadowDomPage.INPUT_CONFIRM_PASSWORD).clear().type(dados.confirmPassword);
            else cy.get(ShadowDomPage.INPUT_CONFIRM_PASSWORD).clear();
        }
    });
})

Cypress.Commands.add('PreencherFormularioExemploShadowDom', (dados: Partial<ShadowDomExampleData>) => {
    cy.get(ShadowDomPage.EXAMPLE_HOST).shadow().within(() => {
        if (dados.name !== undefined) {
            if (dados.name) cy.get(ShadowDomPage.INPUT_EXAMPLE_NAME).clear().type(dados.name);
            else cy.get(ShadowDomPage.INPUT_EXAMPLE_NAME).clear();
        }
        if (dados.email !== undefined) {
            if (dados.email) cy.get(ShadowDomPage.INPUT_EXAMPLE_EMAIL).clear().type(dados.email);
            else cy.get(ShadowDomPage.INPUT_EXAMPLE_EMAIL).clear();
        }
    });
})

