import * as vscode from "vscode";
import { UUVEvent, UUVEventTestFailed, UUVEventTestFinished, UUVEventTestIgnored, UUVEventTestStarted, UUVEventTestSuiteFinished, UUVEventTestSuiteStarted, UUVEventType } from "@uuv/runner-commons";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ipc = require("node-ipc").default;
const UUV_IPC_SERVER_NAME = "uuvIpcServer";

export function vsCodeListener(terminal: vscode.Terminal, token: vscode.CancellationToken, run: vscode.TestRun, allTestItems: vscode.TestItem[]) {
    ipc.config.id = "uuvIpcVsCode";
    ipc.config.retry = 5000;
    ipc.config.silent = true;

    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Loading UUV Tests",
        cancellable: true
    }, () => {
        return new Promise<void>(resolve => {
            token.onCancellationRequested(() => {
                terminal.dispose();
                stopIpcServer(run);
                resolve();
            });
            ipc.connectTo(UUV_IPC_SERVER_NAME, () => {
                ipc.of[UUV_IPC_SERVER_NAME].on("connect", () => {
                    console.log("Vscode connected to UUV Server");

                    ipc.of[UUV_IPC_SERVER_NAME].on("message", (message: UUVEvent) => {
                        switch (message.type) {
                            case UUVEventType.PROGRESS_START:
                                resolve();
                                break;
                            case UUVEventType.TEST_SUITE_STARTED:
                                startTestSuite(run, allTestItems, message.data as UUVEventTestSuiteStarted);
                                break;
                            case UUVEventType.TEST_STARTED:
                                startTest(run, allTestItems, message.data as UUVEventTestStarted);
                                break;
                            case UUVEventType.TEST_FINISHED:
                                finishTest(run, allTestItems, message.data as UUVEventTestFinished);
                                break;
                            case UUVEventType.TEST_FAILED:
                                failTest(run, allTestItems, message.data as UUVEventTestFailed);
                                break;
                            case UUVEventType.TEST_IGNORED:
                                ignoreTest(run, allTestItems, message.data as UUVEventTestIgnored);
                                break;
                            case UUVEventType.TEST_SUITE_FINISHED:
                                stopTestSuite(run, allTestItems, message.data as UUVEventTestSuiteStarted);
                                break;
                            case UUVEventType.PROGRESS_FINISH:
                                stopIpcServer(run);
                                break;
                        }
                    });
                });
            });
        });
    });
}

export function startTestSuite(run: vscode.TestRun, allTestItems: vscode.TestItem[], data: UUVEventTestSuiteStarted) {
    const testSuite = getTestSuiteFromFileName(allTestItems, data.testSuiteName);
    if (testSuite) {
        run.started(testSuite);
    }
}

export function startTest(run: vscode.TestRun, allTestItems: vscode.TestItem[], data: UUVEventTestStarted) {
    const test = getTestFromName(allTestItems, data.testSuiteName, data.testName);
    if (test) {
        run.started(test);
    }
}

export function finishTest(run: vscode.TestRun, allTestItems: vscode.TestItem[], data: UUVEventTestFinished) {
    const test = getTestFromName(allTestItems, data.testSuiteName, data.testName);
    if (test) {
        run.passed(test, data.duration);
    }
}

export function failTest(run: vscode.TestRun, allTestItems: vscode.TestItem[], data: UUVEventTestFailed) {
    const test = getTestFromName(allTestItems, data.testSuiteName, data.testName);
    if (test) {
        run.errored(test, new vscode.TestMessage("Test failed"), data.duration);
    }
}

export function ignoreTest(run: vscode.TestRun, allTestItems: vscode.TestItem[], data: UUVEventTestIgnored) {
    const test = getTestFromName(allTestItems, data.testSuiteName, data.testName);
    if (test) {
        run.skipped(test);
    }
}

export function stopTestSuite(run: vscode.TestRun, allTestItems: vscode.TestItem[], data: UUVEventTestSuiteFinished) {
    const testSuite = getTestSuiteFromFileName(allTestItems, data.testSuiteName);
    if (testSuite) {
        run.passed(testSuite);
    }
}

export function stopIpcServer(run: vscode.TestRun) {
    ipc.disconnect(UUV_IPC_SERVER_NAME);
    console.log("Vscode disconnected of UUV Server");
    run.end();
}

export function getTestSuiteFromFileName(allTestItems: vscode.TestItem[], fileName:string) {
    return allTestItems.find(test => vscode.workspace.asRelativePath(test.uri!) === `uuv/e2e/${fileName}`);
}

export function getTestFromName(allTestItems: vscode.TestItem[], fileName:string, testName:string) {
    const testSuite = getTestSuiteFromFileName(allTestItems, fileName);
    if (testSuite) {
        return testSuite.children.get(`${testSuite.id}-${testName}`);
    }
    return;
}
