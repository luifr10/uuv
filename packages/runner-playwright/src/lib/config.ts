import { defineBddConfig } from "playwright-bdd";

export function buildConfig(
    inputsPaths: string[],
    imports = [
        "cucumber/step_definitions/**/*.{js,ts}",
        "../node_modules/@uuv/playwright/dist/cucumber/step_definitions/playwright/**/*.js"
    ],
    output = ".uuv-features-gen") {
    return defineBddConfig({
        paths: inputsPaths,
        require: imports,
        outputDir: output,
        featuresRoot: "e2e"
    });
}
