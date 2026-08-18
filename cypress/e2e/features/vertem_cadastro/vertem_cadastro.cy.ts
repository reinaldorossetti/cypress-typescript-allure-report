/// <reference types="cypress" />
import { VertemCadastroPage, VertemCadastroData } from "./elements/vertem_cadastro.elements";
import { VertemCadastroFactory } from "./factory/vertem_cadastro.factory";
import * as allure from "allure-js-commons";

describe('Funcionalidade: Cadastro - Fale com um Especialista (Vertem)', () => {

    beforeEach(() => {
        allure.description('Dado que esteja na tela Fale com um Especialista da Vertem');
        cy.DadoQueEstejaNaTelaFaleComEspecialistaVertem();
    });

    afterEach(() => {
        cy.screenshot('end-of-test-state');
    });

    it('CT01 - Validar preenchimento e submissão do formulário com sucesso (Happy Path)', function() {
        allure.description('Dado que interceptamos a chamada do formulário de contato');
        cy.intercept('POST', '**/wp-json/contact-form-7/v1/contact-forms/*/feedback**', {
            statusCode: 200,
            body: {
                status: 'mail_sent',
                message: 'Agradecemos sua mensagem. Ela foi enviada com sucesso.'
            }
        }).as('submitContactForm');

        allure.description('Quando preencher todos os campos do formulário com dados válidos');
        const dadosValidos: VertemCadastroData = VertemCadastroFactory.gerarDadosValidos();

        cy.PreencherFormularioVertem(dadosValidos);

        allure.description('E clicar no botão Entrar para enviar o cadastro');
        cy.get(VertemCadastroPage.BTN_SUBMIT).first().click({ force: true });

        allure.description('Então devemos validar que o formulário foi enviado com sucesso');
        cy.wait('@submitContactForm').its('response.statusCode').should('eq', 200);
        cy.get(VertemCadastroPage.TXT_RESPONSE_OUTPUT).first()
            .should('be.visible')
            .and('contain.text', 'enviada com sucesso');
    });

    it('CT02 - Validar erro de campos obrigatórios ao tentar submeter formulário vazio', function() {
        allure.description('Quando clicar no botão Entrar sem preencher os campos');
        cy.get(VertemCadastroPage.CHECKBOX_ACEITE).first().click();       
        cy.get(VertemCadastroPage.BTN_SUBMIT).first().click({ force: true });
        cy.get('[class*="not-valid-tip"]').first()
            .should('be.visible')
            .and('contain.text', 'Preencha este campo.');

        allure.description('Então devemos validar a mensagem campos possuem um erro');
        cy.contains('Um ou mais campos possuem um erro. Verifique e tente novamente.').should('be.visible');
    });

    it('CT03 - Validar mensagem de erro ao informar e-mail corporativo em formato inválido', function() {
        allure.description('Quando preencher o formulário com um e-mail em formato inválido');
        const dadosEmailInvalido: Partial<VertemCadastroData> = VertemCadastroFactory.gerarDadosEmailInvalido();

        cy.PreencherFormularioVertem(dadosEmailInvalido);

        allure.description('E clicar no botão Entrar');
        cy.get(VertemCadastroPage.BTN_SUBMIT).first().should('be.visible').click({ force: true });

        allure.description('Então devemos validar que o navegador bloqueia pela validação do tipo email');
        cy.get(VertemCadastroPage.INPUT_EMAIL).first().should('be.visible').then(($el) => {
            const input = $el[0] as HTMLInputElement;
            expect(input.checkValidity()).to.be.false;
        });
    });

    it('CT04 - Validar que a submissão não prossegue sem aceite dos termos da LGPD', function() {
        allure.description('Quando preencher o formulário sem marcar o aceite dos termos LGPD');
        const dadosSemAceite: VertemCadastroData = VertemCadastroFactory.gerarDadosSemAceite();

        cy.PreencherFormularioVertem(dadosSemAceite);

        allure.description('E clicar no botão Entrar');
        cy.get(VertemCadastroPage.BTN_SUBMIT).first().click({ force: true });

        allure.description('Então devemos verificar que a checkbox de aceite LGPD permanece desmarcada');
        cy.get(VertemCadastroPage.CHECKBOX_ACEITE).first().then(($el)=>{ $el.get(0).scrollIntoView()}).should('not.be.checked');
    });

});
