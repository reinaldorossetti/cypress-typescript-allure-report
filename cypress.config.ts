import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 30000,
  pageLoadTimeout:60000,
  screenshotOnRunFailure: true,
  allowCypressEnv: true,
  
  env: {
    allure: true,
    video: true,
    allureReuseAfterSpec: true
  },
  
  e2e: {
    baseUrl: "https://www.vr.com.br/",
    chromeWebSecurity: false,
    includeShadowDom: true,
    retries: 1,
    setupNodeEvents(on, config) {
        // implement node event listeners here
        allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
    },
    // Para setar o caminho dos testes.
    specPattern: [
      "cypress/e2e/features/**/*.cy.*",
   ],
  },
});
