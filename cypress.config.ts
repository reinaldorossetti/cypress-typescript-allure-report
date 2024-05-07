import { defineConfig } from "cypress";
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 30000,
  pageLoadTimeout:60000,
  screenshotOnRunFailure: true,

  env: {
    allure: true,
    video: false,
    allureReuseAfterSpec: true
  },
  
  e2e: {
    baseUrl: "https://www.vr.com.br/",
    chromeWebSecurity: false,
    includeShadowDom: true,
    retries: 1,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
    // Para setar o caminho dos testes.
    specPattern: [
      "cypress/e2e/features/**/*.cy.*",
   ],
  },
});
