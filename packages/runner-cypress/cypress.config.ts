import { defineConfig } from "cypress";
import { setupNodeEvents } from "./src/cypress/cypress.config";

export default defineConfig({
    port: 9000,
    video: true,
    e2e: {
        baseUrl: "http://localhost:9001",
        specPattern: "e2e/**/*.{cy.ts,feature}",
        supportFile: false,
        setupNodeEvents,
        viewportWidth: 1536,
        videoUploadOnPasses: false
    }
});
