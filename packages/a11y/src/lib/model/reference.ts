import { A11yRule } from "./rule";

export interface A11yReference {
    name: string;
    version: string;
    rules: A11yRule[];
    url: string;

    /**
     * Build complete coverage
     */
    coverage(): A11yReferenceCoverage;

    /**
     * Returns online rule url related to a ruleId
     * @param ruleId
     */
    getRuleUrl(ruleId: string): string;
}

export enum A11yReferenceEnum {
    RGAA = "RGAA",
    WCAG_WEB = "WCAG-WEB",
    WCAG_ANDROID = "WCAG-ANDROID",
    WCAG_IOS = "WCAG-IOS"
}

export class Comments {
    info?: string;
    warning?: string;
    danger?: string;
}

export abstract class Coverage {
    id!: string;
    name?: string;
    auto = 0;
    partial = 0;
    wontBeImplemented = 0;
    manual = 0;
    inProgress = 0;
    testsCount = 0;
    comments?: Comments;

    autoPercentage(): number {
        return Math.round(
            this.auto /
            (
                this.testsCount
            ) * 100) || 0;
    }
}

export class A11yReferenceCoverage {
    name: string;
    topics: A11yReferenceTopicCoverage[] = [];

    constructor(name: string) {
        this.name = name;
    }
}

export class A11yReferenceTopicCoverage extends Coverage {
    criterias: A11yReferenceCriteriaCoverage[] = [];
    constructor(id, name) {
        super();
        this.id = id;
        this.name = name;
    }
}

export class A11yReferenceCriteriaCoverage extends Coverage {
    tests: A11yReferenceTestCoverage[] = [];
    constructor(id, name) {
        super();
        this.id = id;
        this.name = name;
    }
}

export class A11yReferenceTestCoverage extends Coverage {
    constructor(id, name) {
        super();
        this.id = id;
        this.name = name;
    }
}


