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

import { HomePage } from "../elements/home_page.elements"

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
    cy.contains('Compre online').should('be.visible').click()
    // intercepta a chamada de uma nova aba.
    cy.get('@open').should('have.been.calledOnce')
    cy.visit(Cypress.env("BASE_URL"));
    cy.contains(HomePage.TXT_MESSAGE).should('be.visible')
    cy.get(HomePage.BTN_TERMS).click()
    cy.get(HomePage.BTN_CLOSE).click()
    cy.contains(HomePage.TXT_CARTOES).should('be.visible').click()
})
