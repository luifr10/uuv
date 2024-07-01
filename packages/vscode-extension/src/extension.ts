import * as vscode from "vscode";
import { createTestController } from "./test-controller";
import { Helper } from "./helper";


export function activate(context: vscode.ExtensionContext) {
	console.log("Congratulations, your extension 'uuv' is now active !");

	const disposable = vscode.commands.registerCommand("uuv.open", async () => {
		const terminal = Helper.getUUVTerminal();
		terminal.sendText("npx uuv open");
		terminal.show();
	});

	createTestController();

	context.subscriptions.push(disposable);
}
