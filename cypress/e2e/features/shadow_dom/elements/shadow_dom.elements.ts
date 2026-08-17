export interface ShadowSignUpFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ShadowDomExampleData {
    name: string;
    email: string;
}

export const ShadowDomPage = {
    URL: 'https://www.testmuai.com/selenium-playground/shadow-dom/',

    // Host 1: Sign Up Form (Formulário Principal no Shadow DOM)
    SIGNUP_HOST: 'shadow-signup-form',
    INPUT_USERNAME: 'input[name="username"]',
    INPUT_EMAIL: 'input[name="email"]',
    INPUT_PASSWORD: 'input[name="password"]',
    INPUT_CONFIRM_PASSWORD: 'input[name="confirm_password"]',
    BTN_SUBMIT: 'button',

    // Host 2: Shadow DOM Example (Formulário secundário)
    EXAMPLE_HOST: '#shadow_host',
    INPUT_EXAMPLE_NAME: 'input[placeholder="Name"]',
    INPUT_EXAMPLE_EMAIL: 'input[placeholder="Email"]'
} as const;
