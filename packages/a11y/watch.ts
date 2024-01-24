import * as chokidar from "chokidar";
import { execSync } from "child_process";

function runBuildCommand() {
    const command = "cd ../.. && nx build a11y";
    execSync(command, { stdio: "inherit" });
}

function watchFiles() {
    chokidar.watch("./src/**/*", {
        ignoreInitial: true,
    })
        .on("all", async (event, path) => {
            console.log("Compiling...");
            console.log(event, path);
            runBuildCommand();
            console.log("Compilation ended\n");
        });
}

function main() {
    runBuildCommand();
    watchFiles();
}

main();
