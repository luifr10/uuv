import { defineConfig } from "cypress";
import { setupNodeEvents } from "@uuv/cypress";

export default defineConfig({
    port: 9000,
    video: true,
    videosFolder: "reports/videos",
    screenshotsFolder: "reports/screenshots",
    e2e: {
        baseUrl: "http://localhost:4200",
        specPattern: ["e2e/**/*.cy.ts", "e2e/**/*.feature"],
        excludeSpecPattern: ["e2e/**/*.playbook.feature", "e2e/**/*.playbooked.feature"],
        supportFile: false,
        setupNodeEvents,
        viewportWidth: 1536,
        videoUploadOnPasses: false
    }
});
