/// <reference types="cypress" />
import { ShadowDomPage, ShadowSignUpFormData, ShadowDomExampleData } from "./elements/shadow_dom.elements";
import { ShadowDomFactory } from "./factory/shadow_dom.factory";

describe('Funcionalidade: Realizar o Cadastro em uma página com Shadow DOM', () => {

    beforeEach(() => {
        cy.allure().step('Dado que esteja na página de teste de Cadastro', true);
        cy.DadoQueEstejaNaTelaShadowDom();
    });

    it('CT01 - Validar preenchimento completo do formulário de Sign Up no Shadow DOM (Happy Path)', function() {
        cy.allure().step('Dado que geramos dados dinâmicos válidos de cadastro via Faker', true);
        const dadosValidos: ShadowSignUpFormData = ShadowDomFactory.gerarDadosSignUpValidos();

        cy.allure().step('Quando preencher todos os campos do formulário Sign Up localizados no Shadow Root', true);
        cy.PreencherFormularioSignUpShadowDom(dadosValidos);

        cy.allure().step('Então devemos validar que os campos no Shadow DOM foram preenchidos corretamente', true);
        cy.get(ShadowDomPage.SIGNUP_HOST).shadow().within(() => {
            cy.get(ShadowDomPage.INPUT_USERNAME).should('have.value', dadosValidos.username);
            cy.get(ShadowDomPage.INPUT_EMAIL).should('have.value', dadosValidos.email);
            cy.get(ShadowDomPage.INPUT_PASSWORD).should('have.value', dadosValidos.password);
            cy.get(ShadowDomPage.INPUT_CONFIRM_PASSWORD).should('have.value', dadosValidos.confirmPassword);
        });

        cy.allure().step('E verificar que o botão Submit está presente dentro da árvore Shadow DOM', true);
        cy.get(ShadowDomPage.SIGNUP_HOST).shadow().find(ShadowDomPage.BTN_SUBMIT)
            .should('be.visible')
            .and('contain.text', 'Submit');
    });

    it('CT02 - Validar preenchimento do formulário de exemplo no Shadow Host (#shadow_host)', function() {
        cy.allure().step('Dado que geramos dados dinâmicos para o formulário de exemplo', true);
        const dadosExemplo: ShadowDomExampleData = ShadowDomFactory.gerarDadosExemploValidos();

        cy.allure().step('Quando preencher os campos Name e Email dentro da Shadow Root do #shadow_host', true);
        cy.PreencherFormularioExemploShadowDom(dadosExemplo);

        cy.allure().step('Então devemos validar que os valores foram inseridos com sucesso nos inputs de Shadow DOM', true);
        cy.get(ShadowDomPage.EXAMPLE_HOST).shadow().within(() => {
            cy.get(ShadowDomPage.INPUT_EXAMPLE_NAME).should('have.value', dadosExemplo.name);
            cy.get(ShadowDomPage.INPUT_EXAMPLE_EMAIL).should('have.value', dadosExemplo.email);
        });
    });

    it('CT03 - Validar preenchimento do formulário de Sign Up com confirmação de senha divergente', function() {
        cy.allure().step('Quando preencher o formulário de Sign Up com confirmação de senha divergente', true);
        const dadosSenhaDivergente: ShadowSignUpFormData = ShadowDomFactory.gerarDadosSignUpSenhaDivergente();

        cy.PreencherFormularioSignUpShadowDom(dadosSenhaDivergente);

        cy.allure().step('Então devemos validar que as senhas preenchidas nos inputs do Shadow DOM não coincidem', true);
        cy.get(ShadowDomPage.SIGNUP_HOST).shadow().within(() => {
            cy.get(ShadowDomPage.INPUT_PASSWORD).invoke('val').then((senha) => {
                cy.get(ShadowDomPage.INPUT_CONFIRM_PASSWORD).invoke('val').then((confirmacao) => {
                    expect(senha).to.not.equal(confirmacao);
                });
            });
        });
    });

});
