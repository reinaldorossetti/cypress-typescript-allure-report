export interface VertemCadastroData {
    nome: string;
    email: string;
    telefone: string;
    empresa: string;
    segmento: string;
    faturamento: string;
    cargo: string;
    mensagem: string;
    aceite?: boolean;
}

export const VertemCadastroPage = {
    URL: 'https://vertem.com/fale-com-um-especialista/',
    INPUT_NOME: 'input[name="nome"]',
    INPUT_EMAIL: 'input[name="email"]',
    INPUT_TELEFONE: 'input[name="telefone"]',
    INPUT_EMPRESA: 'input[name="empresa"]',
    SELECT_SEGMENTO: 'select[name="Segmento"]',
    SELECT_FATURAMENTO: 'select[name="fatura"]',
    SELECT_CARGO: 'select[name="campanha"]',
    TEXTAREA_MENSAGEM: 'textarea[name="mensagem"]',
    CHECKBOX_ACEITE: 'input[name="aceite"]',
    BTN_SUBMIT: 'input[type="submit"][value="Entrar"]',
    TXT_RESPONSE_OUTPUT: '.wpcf7-response-output',
    TXT_FIELD_NOT_VALID: '.wpcf7-not-valid-tip'
} as const;
