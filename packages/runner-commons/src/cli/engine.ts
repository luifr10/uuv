import { UUVCliRunner } from "./runner";
import { UUVCliHelper } from "./helper";
import chalk from "chalk";

export class UUVCliEngine {
    constructor(
        private runner: UUVCliRunner
    ) {}

    async execute() {
        let ipcServerProcess;
        try {
            UUVCliHelper.printBanner(this.runner.name, this.runner.getCurrentVersion());

            this.checkArguments();

            const options = UUVCliHelper.extractArgs(this.runner.projectDir, this.runner.defaultBrowser);

            UUVCliHelper.printVariables(options);

            ipcServerProcess = UUVCliHelper.startIpcServer();

            await this.runner.prepare(options);

            console.info(chalk.blueBright(`Executing UUV command ${options.command}...`));

            switch (options.command) {
                case "open":
                    await this.runner.executeOpenCommand(options);
                    break;
                case "e2e":
                    await this.runner.executeE2eCommand(options);
                    break;
                default:
                    throw new Error("Unknown command");
            }

            console.info(`UUV command ${options.command} executed`);
        } catch (e) {
            console.error(chalk.red(e));
            process.exit(1);
        } finally {
            if (ipcServerProcess) {
                UUVCliHelper.stopIpcServer(ipcServerProcess);
            }
        }
    }

    private checkArguments() {
        UUVCliHelper.checkTargetCommand();
        UUVCliHelper.checkTargetTestFiles();
    }
}
