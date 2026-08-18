/// <reference types="cypress" />
import { VertemCadastroPage, VertemCadastroData } from "./elements/vertem_cadastro.elements";
import { VertemCadastroFactory } from "./factory/vertem_cadastro.factory";

describe('Funcionalidade: Cadastro - Fale com um Especialista (Vertem)', () => {

    beforeEach(() => {
        cy.allure().step('Dado que esteja na tela Fale com um Especialista da Vertem', true);
        cy.DadoQueEstejaNaTelaFaleComEspecialistaVertem();
    });

    it('CT01 - Validar preenchimento e submissão do formulário com sucesso (Happy Path)', function() {
        cy.allure().step('Dado que interceptamos a chamada do formulário de contato', true);
        cy.intercept('POST', '**/wp-json/contact-form-7/v1/contact-forms/*/feedback**', {
            statusCode: 200,
            body: {
                status: 'mail_sent',
                message: 'Agradecemos sua mensagem. Ela foi enviada com sucesso.'
            }
        }).as('submitContactForm');

        cy.allure().step('Quando preencher todos os campos do formulário com dados válidos', true);
        const dadosValidos: VertemCadastroData = VertemCadastroFactory.gerarDadosValidos();

        cy.PreencherFormularioVertem(dadosValidos);

        cy.allure().step('E clicar no botão Entrar para enviar o cadastro', true);
        cy.get(VertemCadastroPage.BTN_SUBMIT).first().click({ force: true });

        cy.allure().step('Então devemos validar que o formulário foi enviado com sucesso', true);
        cy.wait('@submitContactForm').its('response.statusCode').should('eq', 200);
        cy.get(VertemCadastroPage.TXT_RESPONSE_OUTPUT).first()
            .should('be.visible')
            .and('contain.text', 'enviada com sucesso');
    });

    it('CT02 - Validar erro de campos obrigatórios ao tentar submeter formulário vazio', function() {
        cy.allure().step('Quando clicar no botão Entrar sem preencher os campos', true);
        cy.get(VertemCadastroPage.BTN_SUBMIT).first().click({ force: true });

        cy.allure().step('Então devemos validar que o navegador bloqueia pela validação de campo obrigatório', true);
        cy.get(VertemCadastroPage.INPUT_NOME).first().then(($el) => {
            const input = $el[0] as HTMLInputElement;
            expect(input.checkValidity()).to.be.false;
        });
    });

    it('CT03 - Validar mensagem de erro ao informar e-mail corporativo em formato inválido', function() {
        cy.allure().step('Quando preencher o formulário com um e-mail em formato inválido', true);
        const dadosEmailInvalido: Partial<VertemCadastroData> = VertemCadastroFactory.gerarDadosEmailInvalido();

        cy.PreencherFormularioVertem(dadosEmailInvalido);

        cy.allure().step('E clicar no botão Entrar', true);
        cy.get(VertemCadastroPage.BTN_SUBMIT).first().click({ force: true });

        cy.allure().step('Então devemos validar que o navegador bloqueia pela validação do tipo email', true);
        cy.get(VertemCadastroPage.INPUT_EMAIL).first().then(($el) => {
            const input = $el[0] as HTMLInputElement;
            expect(input.checkValidity()).to.be.false;
        });
    });

    it('CT04 - Validar que a submissão não prossegue sem aceite dos termos da LGPD', function() {
        cy.allure().step('Quando preencher o formulário sem marcar o aceite dos termos LGPD', true);
        const dadosSemAceite: VertemCadastroData = VertemCadastroFactory.gerarDadosSemAceite();

        cy.PreencherFormularioVertem(dadosSemAceite);

        cy.allure().step('E clicar no botão Entrar', true);
        cy.get(VertemCadastroPage.BTN_SUBMIT).first().click({ force: true });

        cy.allure().step('Então devemos verificar que a checkbox de aceite LGPD permanece desmarcada', true);
        cy.get(VertemCadastroPage.CHECKBOX_ACEITE).first().should('not.be.checked');
    });

});
