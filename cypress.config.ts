import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    baseUrl: "https://loja.vr.com.br/",
    "chromeWebSecurity": false,
    includeShadowDom: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Para setar o caminho dos testes.
    specPattern: [
      "cypress/e2e/tests/*.cy.*",
   ],
  },
});
