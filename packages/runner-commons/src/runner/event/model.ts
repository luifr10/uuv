export const UUV_IPC_SERVER_NAME = "uuvIpcServer";
export const UUV_IPC_PUBLISHER = "uuvIpcPublisher";

export interface UUVEvent {
    type: UUVEventType;
    data: UUVEventProgressStart |
        UUVEventTestSuiteStarted |
        UUVEventTestStarted |
        UUVEventTestFinished |
        UUVEventTestFailed |
        UUVEventTestIgnored |
        UUVEventTestSuiteFinished |
        UUVEventProgressFinish;
}

export enum UUVEventType {
    PROGRESS_START = "progressStart",
    TEST_SUITE_STARTED = "testSuiteStarted",
    TEST_STARTED = "testStarted",
    TEST_FINISHED = "testFinished",
    TEST_FAILED = "testFailed",
    TEST_IGNORED = "testIgnored",
    TEST_SUITE_FINISHED = "testSuiteFinished",
    PROGRESS_FINISH = "progressFinish",
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UUVEventProgressStart {}

export interface UUVEventTestSuiteStarted {
    testSuiteName: string;
    testSuitelocation: string;
}

export interface UUVEventTestStarted {
    testName: string;
    testSuiteName: string;
    testSuitelocation: string;
}

export interface UUVEventTestFinished {
    testName: string;
    testSuiteName: string;
    duration: number;
}

export interface UUVEventTestFailed {
    testName: string;
    testSuiteName: string;
    duration: number;
}

export interface UUVEventTestIgnored {
    testName: string;
    testSuiteName: string;
    duration?: number;
}

export interface UUVEventTestSuiteFinished {
    testSuiteName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UUVEventProgressFinish {}
