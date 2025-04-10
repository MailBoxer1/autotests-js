import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // по умолчанию, можно переопределить
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
  },
});
