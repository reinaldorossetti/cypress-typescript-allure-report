/// <reference types="cypress" />
import { ShadowDomPage, ShadowSignUpFormData, ShadowDomExampleData } from "./elements/shadow_dom.elements";
import { ShadowDomFactory } from "./factory/shadow_dom.factory";
import * as allure from "allure-js-commons";

describe('Funcionalidade: Realizar o Cadastro em uma página com Shadow DOM', () => {

    beforeEach(() => {
        allure.description('Dado que esteja na página de teste de Cadastro');
        cy.DadoQueEstejaNaTelaShadowDom();
    });

    afterEach(() => {
        cy.screenshot('end-of-test-state');
    });

    it('CT01 - Validar preenchimento completo do formulário de Sign Up no Shadow DOM (Happy Path)', function() {
        allure.description('Dado que geramos dados dinâmicos válidos de cadastro via Faker');
        const dadosValidos: ShadowSignUpFormData = ShadowDomFactory.gerarDadosSignUpValidos();

        allure.description('Quando preencher todos os campos do formulário Sign Up localizados no Shadow Root');
        cy.PreencherFormularioSignUpShadowDom(dadosValidos);

        allure.description('Então devemos validar que os campos no Shadow DOM foram preenchidos corretamente');
        cy.get(ShadowDomPage.SIGNUP_HOST).shadow().within(() => {
            cy.get(ShadowDomPage.INPUT_USERNAME).should('have.value', dadosValidos.username);
            cy.get(ShadowDomPage.INPUT_EMAIL).should('have.value', dadosValidos.email);
            cy.get(ShadowDomPage.INPUT_PASSWORD).should('have.value', dadosValidos.password);
            cy.get(ShadowDomPage.INPUT_CONFIRM_PASSWORD).should('have.value', dadosValidos.confirmPassword);
        });

        allure.description('E verificar que o botão Submit está presente dentro da árvore Shadow DOM');
        cy.get(ShadowDomPage.SIGNUP_HOST).shadow().find(ShadowDomPage.BTN_SUBMIT)
            .should('be.visible')
            .and('contain.text', 'Submit');
    });

    it('CT02 - Validar preenchimento do formulário de exemplo no Shadow Host (#shadow_host)', function() {
        allure.description('Dado que geramos dados dinâmicos para o formulário de exemplo');
        const dadosExemplo: ShadowDomExampleData = ShadowDomFactory.gerarDadosExemploValidos();

        allure.description('Quando preencher os campos Name e Email dentro da Shadow Root do #shadow_host');
        cy.PreencherFormularioExemploShadowDom(dadosExemplo);

        allure.description('Então devemos validar que os valores foram inseridos com sucesso nos inputs de Shadow DOM');
        cy.get(ShadowDomPage.EXAMPLE_HOST).shadow().within(() => {
            cy.get(ShadowDomPage.INPUT_EXAMPLE_NAME).should('have.value', dadosExemplo.name);
            cy.get(ShadowDomPage.INPUT_EXAMPLE_EMAIL).should('have.value', dadosExemplo.email);
        });
    });

    it('CT03 - Validar preenchimento do formulário de Sign Up com confirmação de senha divergente', function() {
        allure.description('Quando preencher o formulário de Sign Up com confirmação de senha divergente');
        const dadosSenhaDivergente: ShadowSignUpFormData = ShadowDomFactory.gerarDadosSignUpSenhaDivergente();

        cy.PreencherFormularioSignUpShadowDom(dadosSenhaDivergente);

        allure.description('Então devemos validar que as senhas preenchidas nos inputs do Shadow DOM não coincidem');
        cy.get(ShadowDomPage.SIGNUP_HOST).shadow().within(() => {
            cy.get(ShadowDomPage.INPUT_PASSWORD).invoke('val').then((senha) => {
                cy.get(ShadowDomPage.INPUT_CONFIRM_PASSWORD).invoke('val').then((confirmacao) => {
                    expect(senha).to.not.equal(confirmacao);
                });
            });
        });
    });

});
