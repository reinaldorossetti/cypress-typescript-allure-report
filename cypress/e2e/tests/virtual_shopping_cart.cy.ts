
describe('Carrinho de compras funcionalidade', () => {

    beforeEach(() => {
      cy.DadoQueEstejaNaTelaDeCartoes();
    })

    it('Teste validar produto adicionado no carrinho de compras, com sucesso', function() {
      
      const value = String(Cypress._.random(100, 300))
      const value_format = String(value).replace(/(.)(?=(\d{2})+$)/g,'$1,')

      cy.contains('Cartões VR').should('be.visible').click()
      cy.get("input#produto-auto-quantidade").then(($el)=>{ $el.get(0).scrollIntoView()})
        .type(value)
      cy.get('#produto-auto-valor').then(($el)=>{ $el.get(0).scrollIntoView()}).type(value)
      cy.get('#btn-adicionar-carrinho-auto').then(($el)=>{ $el.get(0).scrollIntoView()}).click()
      cy.contains('Produto adicionado!').should('be.visible')
      cy.contains('Seguir para o carrinho').should('be.visible')
      cy.get('#btn-meu-carrinho').then(($el)=>{ $el.get(0).scrollIntoView()}).click()

      cy.contains('Meu carrinho').should('be.visible')
      cy.contains('Valor por cartão').should('be.visible')
      cy.contains('Quantidade cartões').should('be.visible')
      cy.contains('Total parcial:').should('be.visible')
      cy.contains('Adicionar ou editar produtos').should('be.visible')
      cy.contains(value).should('be.visible')
      cy.contains("R$ " + value_format).should('be.visible')
      
      const partial_total = String(parseFloat(value) * parseFloat(value_format.replace(",", '.')))
      cy.contains("R$ " + partial_total.replace(".", ',')).should('be.visible')
    })

})