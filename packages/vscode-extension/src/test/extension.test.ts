import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

suite("UUV Extension", async () => {
	const allCommands = await vscode.commands.getCommands();

	test("should contains open command", () => {
		// assert.equal(allCommands.indexOf("uuv.open"), -1);
		assert.equal(0, -1);
	});
});
