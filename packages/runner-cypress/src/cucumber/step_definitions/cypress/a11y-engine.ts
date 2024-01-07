/**
* Software Name : UUV
*
* SPDX-FileCopyrightText: Copyright (c) 2022-2023 Orange
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at https://spdx.org/licenses/MIT.html
* or see the "LICENSE" file for more details.
*
* Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
* Software description: Make test writing fast, understandable by any human
* understanding English or French.
*/

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    A11yChecker,
    A11yReference, A11yReferenceEnum,
    A11yResult,
    A11yResultStatus,
    A11yRuleResult,
    NodeToCheckManually,
    NonCompliantNode
} from "@uuv/a11y";
import { tap } from "rxjs";
import ObjectLike = Cypress.ObjectLike;
import $ from "jquery";

export const injectUvvA11y = () => {

    const fileName =
        typeof require?.resolve === "function"
            ? require.resolve("@uuv/a11y/bundle")
            : "node_modules/@uuv/a11y/bundle/uuv-a11y.bundle.js";
    cy.readFile<string>(fileName).then((source) =>
        cy.window({ log: false }).then((window) => {
            window.eval(source);
        })
    );
};

export const checkUvvA11y = (reference: A11yReferenceEnum, expectedResult?: any) => {
    cy.window({ log: false })
        .then((win: any) => {
            const url = win.location.href;
            const rgaaChecker = getA11yCheckerForReference(win, reference, url);
            assert.isDefined(rgaaChecker, "A11y reference not found");
            return rgaaChecker?.validate()
                .pipe(
                    tap((result: A11yResult) => {
                        logAllA11yRuleResult(result);
                        assertWithExpectedResult(expectedResult, result);
                    })
                )
                .toPromise();
        });
};

function getA11yCheckerForReference(win: any, reference: A11yReferenceEnum, url): A11yChecker | undefined {
    let rgaaChecker;
    switch (reference) {
        case A11yReferenceEnum.WCAG_WEB:
            break;
        case A11yReferenceEnum.WCAG_ANDROID:
            break;
        case A11yReferenceEnum.WCAG_IOS:
            break;
        case A11yReferenceEnum.RGAA:
        default:
            rgaaChecker = new win.uuvA11y.RgaaChecker(url);
            break;
    }
    return rgaaChecker;
}

function assertWithExpectedResult(expectedResult: any, result: A11yResult) {
    if (expectedResult) {
        assert.deepEqual(result.summary(), expectedResult, "A11y validation failed");
    } else {
        assert.notEqual(result.status, A11yResultStatus.ERROR, "A11y validation failed");
        assert.notEqual(result.status, A11yResultStatus.UNKNOWN, "A11y validation failed");
    }
}

function logAllA11yRuleResult(result: A11yResult) {
    result.ruleResults.forEach(ruleResult => {
        // logValidatingA11yRule(result.reference, ruleResult);
        logA11yRuleResult(result.reference, ruleResult);
    });
}

function logA11yRuleResult(reference: A11yReference, ruleResult: A11yRuleResult) {
    switch (ruleResult.status) {
        case A11yResultStatus.ERROR:
            logNonCompliantNode(reference, ruleResult);
            break;
        case A11yResultStatus.MANUAL:
            logNodeToCheckManually(reference, ruleResult);
            break;
        case A11yResultStatus.UNKNOWN:
            break;
        case A11yResultStatus.SUCCESS:
            break;
    }
}

function buildCypressLog(name: string, message: string, consoleLog?: ObjectLike) {
    return Cypress.log({
        name: name,
        displayName: name,
        message: message,
        consoleProps() {
            return consoleLog ? consoleLog : {};
        }
    });
}

function logNonCompliantNode(reference: A11yReference, ruleResult: A11yRuleResult) {
    const errorNodes = ruleResult.getErrorNodes();
    const log = buildCypressLog(
        `${reference.name} error !`,
        `criteria ${ruleResult.rule.criterion} on ${errorNodes.length} nodes`,
        getConsoleDetails(reference, ruleResult, errorNodes)
    );
    errorNodes.forEach(nonCompliantNode => log.set({ $el: $(nonCompliantNode.node as any) }).snapshot());
    log.error(new Error(`Validation failed on ${errorNodes.length} nodes`));
}

function logNodeToCheckManually(reference: A11yReference, ruleResult: A11yRuleResult) {
    const nodesToCheckManually = ruleResult.getNodesToCheckManually();
    const log = buildCypressLog(
        `${reference.name} to validate manually !`,
        `criteria ${ruleResult.rule.criterion} on ${nodesToCheckManually.length} nodes`,
        getConsoleDetails(reference, ruleResult, nodesToCheckManually)
    );
    nodesToCheckManually.forEach(nodeToCheck => log.set({ $el: $(nodeToCheck.node) }).snapshot());
    log.finish();
}

function getConsoleDetails(reference: A11yReference, ruleResult: A11yRuleResult, nodes: (NonCompliantNode | NodeToCheckManually)[]) {
    return {
        Id: ruleResult.rule.id,
        WCAG: ruleResult.rule.wcag,
        targetUrl: ruleResult.url,
        Criteria: ruleResult.rule.criterion,
        "Element type": ruleResult.rule.elementType,
        Description: ruleResult.rule.description,
        Help: `${ruleResult.rule.help}, ${reference.getRuleUrl(ruleResult.rule.id)}`,
        nodes: nodes
    };
}
