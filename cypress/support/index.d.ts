import { VertemCadastroData } from "../e2e/features/vertem_cadastro/elements/vertem_cadastro.elements";
import { ShadowSignUpFormData, ShadowDomExampleData } from "../e2e/features/shadow_dom/elements/shadow_dom.elements";

declare global {
  namespace Cypress {
    interface Chainable {
      /** Add GerarCNPJ function**/
      GerarCNPJ(): Chainable<string>;
      /** Add DadoQueEstejaNaTelaDeCartoes **/
      DadoQueEstejaNaTelaDeCartoes(): Chainable<any>;
      /** Navega para a tela Fale com um Especialista da Vertem **/
      DadoQueEstejaNaTelaFaleComEspecialistaVertem(): Chainable<any>;
      /** Preenche os campos do formulário de cadastro/contato Vertem **/
      PreencherFormularioVertem(dados: Partial<VertemCadastroData>): Chainable<any>;
      /** Navega para a tela de testes de Shadow DOM **/
      DadoQueEstejaNaTelaShadowDom(): Chainable<any>;
      /** Preenche o formulário de Sign Up dentro do Shadow DOM **/
      PreencherFormularioSignUpShadowDom(dados: Partial<ShadowSignUpFormData>): Chainable<any>;
      /** Preenche o formulário secundário de Exemplo dentro do Shadow DOM **/
      PreencherFormularioExemploShadowDom(dados: Partial<ShadowDomExampleData>): Chainable<any>;
    }
  }
}



