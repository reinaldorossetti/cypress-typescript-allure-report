/// <reference types="cypress" />
import { CartoesPage } from "../../elements/virtual_shopping.elements"

describe('Carrinho de compras funcionalidade', () => {

    beforeEach(() => {
      cy.DadoQueEstejaNaTelaDeCartoes();
    })

    it('CT01 - validar produto adicionado no carrinho de compras com sucesso', function() {
      
      const value = String(Cypress._.random(100, 300))
      const value_format = String(value).replace(/(.)(?=(\d{2})+$)/g,'$1,')

      cy.get(CartoesPage.INPUT_AUTO_QUANTIDADE).then(($el)=>{ $el.get(0).scrollIntoView()})
        .type(value)
      cy.get(CartoesPage.INPUT_AUTO_VALOR).then(($el)=>{ $el.get(0).scrollIntoView()}).type(value)
      cy.get(CartoesPage.BTN_ADD_CART).then(($el)=>{ $el.get(0).scrollIntoView()}).click()
      
      cy.contains(CartoesPage.TXT_PROD_ADICIONADO).should('be.visible')
      cy.contains(CartoesPage.TXT_MESSAGE_CART).should('be.visible')
      cy.get(CartoesPage.BTN_CART).then(($el)=>{ $el.get(0).scrollIntoView()}).click()

      cy.contains(CartoesPage.TXT_MEU_CARRINHO).should('be.visible')
      cy.contains(CartoesPage.TXT_VALOR_CARTAO).should('be.visible')
      cy.contains(CartoesPage.TXT_QUATIDADE_CARTAO).should('be.visible')
      cy.contains(CartoesPage.TXT_TOTAL_PARCIAL).should('be.visible')
      cy.contains(CartoesPage.TXT_ADD_EDIT).should('be.visible')
      cy.contains(value).should('be.visible')
      cy.contains("R$ " + value_format).should('be.visible')
      
      const partial_total = String(((parseFloat(value) * parseFloat(value_format.replace(",", '.'))).toFixed(2)))
      cy.contains("R$ " + partial_total.replace(".", ',')).should('be.visible')
    })

})