/* eslint-disable quotes */
import {
    UUVEventTestFailed,
    UUVEventTestFinished,
    UUVEventTestIgnored,
    UUVEventTestStarted,
    UUVEventTestSuiteFinished,
    UUVEventTestSuiteStarted,
    UUVEventType,
    UUV_IPC_PUBLISHER,
    UUV_IPC_SERVER_NAME
} from "./model";

export class UUVEventEmitter {
    private static instance: UUVEventEmitter;
    ipc;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.ipc = require('node-ipc').default;
        this.ipc.config.id = UUV_IPC_PUBLISHER;
        this.ipc.config.retry = 1500;
        this.ipc.config.silent = true;
    }

    static async createInstance() {
        return new Promise((resolve) => {
            UUVEventEmitter.instance = new UUVEventEmitter();
            UUVEventEmitter.instance.ipc.connectTo(UUV_IPC_SERVER_NAME, () => {
                UUVEventEmitter.instance.ipc.of[UUV_IPC_SERVER_NAME].on('connect', () => {
                    console.debug("Publisher connected to UUV Server");
                    resolve("ok");
                });
            });
        });
    }

    static getInstance() {
        return UUVEventEmitter.instance;
    }

    emitProgressStart() {
        this.ipc.of[UUV_IPC_SERVER_NAME].emit('message', {
            type: UUVEventType.PROGRESS_START
        });
    }

    emitTestSuiteStarted(event: UUVEventTestSuiteStarted) {
        this.ipc.of[UUV_IPC_SERVER_NAME].emit('message', {
            type: UUVEventType.TEST_SUITE_STARTED,
            data: event
        });
    }

    emitTestStarted(event: UUVEventTestStarted) {
        this.ipc.of[UUV_IPC_SERVER_NAME].emit('message', {
            type: UUVEventType.TEST_STARTED,
            data: event
        });
    }

    emitTestFailed(event: UUVEventTestFailed) {
        this.ipc.of[UUV_IPC_SERVER_NAME].emit('message', {
            type: UUVEventType.TEST_FAILED,
            data: event
        });
    }

    emitTestIgnored(event: UUVEventTestIgnored) {
        this.ipc.of[UUV_IPC_SERVER_NAME].emit('message', {
            type: UUVEventType.TEST_IGNORED,
            data: event
        });
    }

    emitTestFinished(event: UUVEventTestFinished) {
        this.ipc.of[UUV_IPC_SERVER_NAME].emit('message', {
            type: UUVEventType.TEST_FINISHED,
            data: event
        });
    }

    emitTestSuiteFinished(event: UUVEventTestSuiteFinished) {
        this.ipc.of[UUV_IPC_SERVER_NAME].emit('message', {
            type: UUVEventType.TEST_SUITE_FINISHED,
            data: event
        });
    }

    emitProgressFinish() {
        this.ipc.of[UUV_IPC_SERVER_NAME].emit('message', {
            type: UUVEventType.PROGRESS_FINISH
        });
    }
}
