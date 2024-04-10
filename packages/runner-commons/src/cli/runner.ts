import { UUVCliOptions } from "./options";

export interface UUVCliRunner {
    /**
     * Runner name e.g: Cypress, Playwright
     */
    name: string;

    /**
     * Project directory
     */
    projectDir: string;

    /**
     * Default browser
     */
    defaultBrowser: string;

    /**
     * Return runner current version
     */
    getCurrentVersion(): string;

    /**
     * Prepare runner to execute command
     * @param options
     */
    prepare(options: Partial<UUVCliOptions>);

    /**
     * Execute "e2e" command
     * @param options
     */
    executeE2eCommand(options: Partial<UUVCliOptions>);

    /**
     * Execute "open" command
     * @param options
     */
    executeOpenCommand(options: Partial<UUVCliOptions>);
}
