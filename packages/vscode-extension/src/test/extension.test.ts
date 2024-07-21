import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

suite("UUV Extension", async () => {
	test("should contains uuv.open command", async () => {
		const allCommands = await vscode.commands.getCommands();
		assert.notEqual(allCommands.indexOf("uuv.open"), -1);
	});

	test("should contains uuv.assistant command", async () => {
		const allCommands = await vscode.commands.getCommands();
		assert.notEqual(allCommands.indexOf("uuv.assistant"), -1);
	});
});
