import { fakerPT_BR as faker } from '@faker-js/faker';
import { ShadowSignUpFormData, ShadowDomExampleData } from '../elements/shadow_dom.elements';

export class ShadowDomFactory {
    /**
     * Gera um conjunto de dados para o formulário de Sign Up em Shadow DOM com senhas iguais.
     */
    public static gerarDadosSignUpValidos(overrides: Partial<ShadowSignUpFormData> = {}): ShadowSignUpFormData {
        const password = faker.internet.password({ length: 12, prefix: 'Pass123!' });
        return {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: password,
            confirmPassword: password,
            ...overrides
        };
    }

    /**
     * Gera um conjunto de dados para o formulário de Sign Up com confirmação de senha divergente.
     */
    public static gerarDadosSignUpSenhaDivergente(overrides: Partial<ShadowSignUpFormData> = {}): ShadowSignUpFormData {
        return this.gerarDadosSignUpValidos({
            confirmPassword: 'SenhaTotalmenteDiferente123!',
            ...overrides
        });
    }

    /**
     * Gera dados para o formulário secundário de Exemplo no Shadow DOM (#shadow_host).
     */
    public static gerarDadosExemploValidos(overrides: Partial<ShadowDomExampleData> = {}): ShadowDomExampleData {
        return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            ...overrides
        };
    }
}
