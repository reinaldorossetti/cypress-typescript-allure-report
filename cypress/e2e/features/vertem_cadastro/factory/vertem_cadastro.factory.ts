import { fakerPT_BR as faker } from '@faker-js/faker';
import { VertemCadastroData } from '../elements/vertem_cadastro.elements';

export class VertemCadastroFactory {
    private static segmentos = [
        'Tecnologia',
        'Financeiro',
        'Varejo',
        'Saúde',
        'Educação',
        'Outros'
    ];

    private static faturamentos = [
        'Até R$ 100MM',
        'De R$ 100MM até 600MM',
        'De R$ 600MM até R$ 1Bi',
        'De R$ 1Bi até R$ 5Bi',
        'Acima de R$ 5Bi'
    ];

    private static cargos = [
        'Gerente',
        'Diretor',
        'Analista',
        'Coordenador',
        'CEO / C-Level'
    ];

    /**
     * Gera um conjunto completo de dados válidos para o formulário Vertem Cadastro.
     */
    public static gerarDadosValidos(overrides: Partial<VertemCadastroData> = {}): VertemCadastroData {
        const ddd = faker.number.int({ min: 11, max: 99 });
        const numero = faker.number.int({ min: 900000000, max: 999999999 });

        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            telefone: `(${ddd}) ${numero.toString().replace(/(\d{5})(\d{4})/, '$1-$2')}`,
            empresa: faker.company.name(),
            segmento: faker.helpers.arrayElement(this.segmentos),
            faturamento: faker.helpers.arrayElement(this.faturamentos),
            cargo: faker.helpers.arrayElement(this.cargos),
            mensagem: faker.lorem.sentence(),
            aceite: true,
            ...overrides
        };
    }

    /**
     * Gera um conjunto de dados sem o aceite dos termos LGPD.
     */
    public static gerarDadosSemAceite(overrides: Partial<VertemCadastroData> = {}): VertemCadastroData {
        return this.gerarDadosValidos({
            aceite: false,
            ...overrides
        });
    }

    /**
     * Gera um conjunto de dados com formato de e-mail inválido.
     */
    public static gerarDadosEmailInvalido(overrides: Partial<VertemCadastroData> = {}): Partial<VertemCadastroData> {
        return this.gerarDadosValidos({
            email: `${faker.person.firstName().toLowerCase()}.email_invalido`,
            ...overrides
        });
    }
}
