import * as vscode from "vscode";
import { vsCodeListener } from "./uuv-vscode-listener";
import { Helper } from "./helper";

export function createTestController() {
    const testController = vscode.tests.createTestController(
        "uuvE2eTests",
        "UUV E2E Tests"
    );

    testController.resolveHandler = async (test) => {
        if (!test) {
          await discoverAllFilesInWorkspace(testController);
        } else {
          await Helper.parseTestsInFileContents(testController, test);
        }
    };

    const runProfile = testController.createRunProfile(
        "Run UUV E2E Tests",
        vscode.TestRunProfileKind.Run,
        (request, token) => {
          runHandler(testController, false, request, token);
        }
    );

    // When text documents are open, parse tests in them.
    vscode.workspace.onDidOpenTextDocument(e => Helper.parseTestsInDocument(testController, e));
    // We could also listen to document changes to re-parse unsaved changes:
    vscode.workspace.onDidChangeTextDocument(e => Helper.parseTestsInDocument(testController, e.document));

    return testController;
}

async function discoverAllFilesInWorkspace(testController: vscode.TestController): Promise<vscode.FileSystemWatcher[]> {
    if (!vscode.workspace.workspaceFolders) {
        return []; // handle the case of no open folders
    }

    return Promise.all(
        vscode.workspace.workspaceFolders.map(async workspaceFolder => {
            const pattern = new vscode.RelativePattern(workspaceFolder, "uuv/**/*.feature");
            const watcher = vscode.workspace.createFileSystemWatcher(pattern);

            // When files are created, make sure there's a corresponding "file" node in the tree
            watcher.onDidCreate(uri => Helper.getOrCreateFile(testController, uri));
            // When files change, re-parse them. Note that you could optimize this so
            // that you only re-parse children that have been resolved in the past.
            watcher.onDidChange(uri => Helper.parseTestsInFileContents(testController, Helper.getOrCreateFile(testController, uri)));
            // And, finally, delete TestItems for removed files. This is simple, since
            // we use the URI as the TestItem's ID.
            watcher.onDidDelete(uri => testController.items.delete(uri.toString()));

            for (const file of await vscode.workspace.findFiles(pattern)) {
                const testItem = Helper.getOrCreateFile(testController, file);
                testController.items.add(testItem);
            }

            return watcher;
        })
    );
}

function runHandler(
    testController: vscode.TestController,
	shouldDebug: boolean,
	request: vscode.TestRunRequest,
	token: vscode.CancellationToken
) {
    const run = testController.createTestRun(request);
    const terminal = Helper.getUUVTerminal();

    const queue: vscode.TestItem[] = [];
    let targetTestArgs = "";
    // Loop through all included tests, or all known tests, and add them to our queue
    if (request.include) {
        request.include.forEach(test => {
            queue.push(test);
            const uri = Helper.getTestFile(test);
            if (uri) {
                targetTestArgs = ` --targetTestFile=${vscode.workspace.asRelativePath(uri)}`;
            }
        });
    } else {
        testController.items.forEach(test => queue.push(test));
    }

    terminal.sendText(`npx uuv e2e --env="{'enableVsCodeListener':true}"${targetTestArgs}`);

     // For every test that was queued, try to run it. Call run.passed() or run.failed().
    // The `TestMessage` can contain extra information, like a failing location or
    // a diff output. But here we'll just give it a textual message.
    const allTestItems: vscode.TestItem[] = [];
    testController.items.forEach(test => allTestItems.push(test));
    vsCodeListener(terminal, token, run, allTestItems);
}
