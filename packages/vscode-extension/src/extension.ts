import * as vscode from "vscode";
import { createUUVTestController } from "./test-controller";
import { Helper } from "./helper";

export function activate(context: vscode.ExtensionContext) {
	console.debug("Congratulations, your extension 'uuv' is now active !");

	context.subscriptions.push(buildUuvVsCodeOpenCommand());
	context.subscriptions.push(buildUuvVsCodeOpenAssistantCommand());

	createUUVTestController();
}

function buildUuvVsCodeOpenCommand(): vscode.Disposable {
	return vscode.commands.registerCommand("uuv.open", async () => {
		console.debug("Running UUV open command!");
		const terminal = Helper.getUUVTerminal();
		terminal.sendText(Helper.buildUUVConsoleCommand("open"));
		terminal.show();
	});
}

function buildUuvVsCodeOpenAssistantCommand(): vscode.Disposable {
	return vscode.commands.registerCommand("uuv.assistant", async () => {
		const result = await vscode.window.showInputBox({
			value: "https://google.com",
			prompt: "Please enter the target url where you want to open UUV assistant",
			placeHolder: "Please enter the target url where you want to open UUV assistant",
			ignoreFocusOut: true,
			validateInput: targetUrl => {
				const errorMessage = "Invalid URL";
				try {
					const url = new URL(targetUrl);
					return url.protocol === "http:" || url.protocol === "https:" ? null : errorMessage;
				} catch (error) {
					return errorMessage;
				}
			}
		});
		if (result) {
			const terminal = Helper.getUUVTerminal();
			terminal.sendText(Helper.buildUUVAssistantConsoleCommand(result));
			terminal.show();
		}
	});
}
