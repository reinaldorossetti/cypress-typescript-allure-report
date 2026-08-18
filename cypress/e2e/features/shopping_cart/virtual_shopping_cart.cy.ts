/// <reference types="cypress" />
import { CartoesPage } from "./elements/virtual_shopping.elements"
import * as allure from "allure-js-commons";

describe('Carrinho de compras funcionalidade', () => {

    beforeEach(() => {
      allure.description('Dado que esteja na tela de cartões VR.')
      cy.DadoQueEstejaNaTelaDeCartoes();
    })

    it.skip('CT01 - validar produto auto desativado ao entrar na página Cartões VR', function() {
      
      allure.description('Quando adicionar a quantidade e o valor do produto ao carrinho')

      cy.get(CartoesPage.BTN_ADD_CART).then(($el)=>{ $el.get(0).scrollIntoView()}).should('be.disabled')

      cy.get(CartoesPage.BTN_CART).then(($el)=>{ $el.get(0).scrollIntoView()}).click()

      allure.description('Então devemos validar que o carrinho está vazio.')

      cy.contains(CartoesPage.TXT_CARINHO_VAZIO).should('be.visible')
      cy.get(CartoesPage.ICON_CARINHO_VAZIO).should('be.visible')

    })

    it.skip('CT02 - validar produto adicionado no carrinho de compras com sucesso', function() {
      
      allure.description('Quando adicionar a quantidade e o valor do produto ao carrinho')

      const value = String(Cypress._.random(100, 300))
      const value_format = String(value).replace(/(.)(?=(\d{2})+$)/g,'$1,')

      cy.get(CartoesPage.INPUT_AUTO_QUANTIDADE).then(($el)=>{ $el.get(0).scrollIntoView()})
        .type(value)
      cy.get(CartoesPage.INPUT_AUTO_VALOR).then(($el)=>{ $el.get(0).scrollIntoView()}).type(value)
      cy.get(CartoesPage.BTN_ADD_CART).then(($el)=>{ $el.get(0).scrollIntoView()}).click()
      
      cy.contains(CartoesPage.TXT_PROD_ADICIONADO).should('be.visible')
      cy.contains(CartoesPage.TXT_MESSAGE_CART).should('be.visible')
      cy.get(CartoesPage.BTN_CART).then(($el)=>{ $el.get(0).scrollIntoView()}).click()

      allure.description('Então devemos validar que os dados adicionando ao carrinho estão corretos.')

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

    it.skip('CT03 - validar produto adicionado no carrinho de compras com sucesso, usando o valor máximo', function() {
      
      allure.description('Quando adicionar a quantidade e o valor do produto ao carrinho')

      const value1 = "300"
      const value2 = "9999999"
      const value2_format = "R$ 9.999,99"
      const value_expected = "R$ 2.999.997,00"

      cy.get(CartoesPage.INPUT_AUTO_QUANTIDADE).then(($el)=>{ $el.get(0).scrollIntoView()})
        .type(value1)
      cy.get(CartoesPage.INPUT_AUTO_VALOR).then(($el)=>{ $el.get(0).scrollIntoView()}).type(value2)
      cy.get(CartoesPage.BTN_ADD_CART).then(($el)=>{ $el.get(0).scrollIntoView()}).click()
      
      cy.contains(CartoesPage.TXT_PROD_ADICIONADO).should('be.visible')
      cy.contains(CartoesPage.TXT_MESSAGE_CART).should('be.visible')
      cy.get(CartoesPage.BTN_CART).then(($el)=>{ $el.get(0).scrollIntoView()}).click()

      allure.description('Então devemos validar que os dados adicionando ao carrinho estão corretos.')

      cy.contains(CartoesPage.TXT_MEU_CARRINHO).should('be.visible')
      cy.contains(CartoesPage.TXT_VALOR_CARTAO).should('be.visible')
      cy.contains(CartoesPage.TXT_QUATIDADE_CARTAO).should('be.visible')
      cy.contains(CartoesPage.TXT_TOTAL_PARCIAL).should('be.visible')
      cy.contains(CartoesPage.TXT_ADD_EDIT).should('be.visible')
      cy.contains(value1).should('be.visible')
      cy.contains(value2_format).should('be.visible')
      cy.contains(value_expected).should('be.visible')
    })

    it.skip('CT04 - validar mensagem de erro ao adicionar valor minimo', function() {
      
      allure.description('Quando adicionar o valor minimo a quantidade e o valor do produto ao carrinho')

      const value = String(1)
      cy.get(CartoesPage.INPUT_AUTO_QUANTIDADE).then(($el)=>{ $el.get(0).scrollIntoView()})
        .type(value)
      cy.get(CartoesPage.INPUT_AUTO_VALOR).then(($el)=>{ $el.get(0).scrollIntoView()}).type(value)
      
      allure.description('Então validar mensagem de erro de valor mínimo')
      
      cy.contains(CartoesPage.TXT_VALOR_MINIMO).should('be.visible')

    })

    it.skip('CT05 - validar mensagem de erro ao adicionar quantidade acima do maximo', function() {
      
      allure.description('Quando adicionar a quantidade e o valor do produto ao carrinho')

      const value = String(301)
      cy.get(CartoesPage.INPUT_AUTO_QUANTIDADE).then(($el)=>{ $el.get(0).scrollIntoView()})
        .type(value)
      cy.get(CartoesPage.INPUT_AUTO_VALOR).then(($el)=>{ $el.get(0).scrollIntoView()}).type(value)
      
      Cypress.on('uncaught:exception', (err, runnable) => {
        cy.get(CartoesPage.BTN_ADD_CART).then(($el)=>{ $el.get(0).scrollIntoView()}).click()
      })

      allure.description('Então validar mensagem de erro de valor máximo')
      
      cy.contains(CartoesPage.TXT_QTD_MAXIMA).should('be.visible')

      allure.description('E devemos validar que o carrinho está vazio.')
   
      cy.get(CartoesPage.BTN_CART).then(($el)=>{ $el.get(0).scrollIntoView()}).click()
      cy.contains(CartoesPage.TXT_CARINHO_VAZIO).should('be.visible')
      cy.get(CartoesPage.ICON_CARINHO_VAZIO).should('be.visible')

    })

})