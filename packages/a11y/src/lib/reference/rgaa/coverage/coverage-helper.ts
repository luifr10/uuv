import {
    A11yReferenceCoverage,
    A11yReferenceCriteriaCoverage,
    A11yReferenceTestCoverage,
    A11yReferenceTopicCoverage,
    RuleCheckEnum,
    Comments, Coverage
} from "../../../model";
import * as PARTIAL_COVERAGE from "./coverage-statement.json";
import { REFERENCE_NAME, REFERENCE_VERSION } from "../common";
import * as REFERENCE_CRITERIUM from "../rgaa_4.1.criteres.json";
import { A11Y_RGAA_REFERENCE } from "../../../reference";

function getCheckModeForCriteria(criteria: string): RuleCheckEnum[] {
    const checkModeForCriteria: RuleCheckEnum[] = [];
    A11Y_RGAA_REFERENCE.rules
        .filter(rule => rule.id === criteria)
        .forEach(rule => {
            if (!checkModeForCriteria.includes(rule.check)) {
                checkModeForCriteria.push(rule.check);
            }
        });
    return checkModeForCriteria;
}

function addMessages(itemId: string, coverage: Coverage) {
    coverage.comments = Object.assign(new Comments(), PARTIAL_COVERAGE.comments[itemId]);
}

export function buildCoverage() {
    const referenceCoverage: A11yReferenceCoverage = new A11yReferenceCoverage(`${REFERENCE_NAME} ${REFERENCE_VERSION}`);

    REFERENCE_CRITERIUM.topics?.forEach((topic) => {
        const topicCoverage = new A11yReferenceTopicCoverage(topic.number, topic.topic);
        addMessages(topic.number + "", topicCoverage);
        topic.criteria.forEach((criterion) => {
            const completeCriteriaId = `${topic.number}.${criterion.criterium.number}`;
            const criteriaCoverage = new A11yReferenceCriteriaCoverage(completeCriteriaId, criterion.criterium.title);
            addMessages(completeCriteriaId, criteriaCoverage);
            Object.keys(criterion.criterium.tests).forEach((testId) => {
                const completeTestId = `${topic.number}.${criterion.criterium.number}.${testId}`;
                const testCoverage = new A11yReferenceTestCoverage(completeTestId, criterion.criterium.tests[testId].join("<br/>"));
                addMessages(completeTestId, testCoverage);
                if (PARTIAL_COVERAGE.implemented.find((element) => element === completeTestId)) {
                    const checkModeForCriteria = getCheckModeForCriteria(completeTestId);
                    if (checkModeForCriteria.length > 1) {
                        testCoverage.partial++;
                        criteriaCoverage.partial++;
                        topicCoverage.partial++;
                    } else if (checkModeForCriteria.length === 1) {
                        if (checkModeForCriteria[0] === RuleCheckEnum.AUTO) {
                            testCoverage.auto++;
                            criteriaCoverage.auto++;
                            topicCoverage.auto++;
                        } else if (checkModeForCriteria[0] === RuleCheckEnum.MANUAL) {
                            testCoverage.manual++;
                            criteriaCoverage.manual++;
                            topicCoverage.manual++;
                        }
                    }
                }
                if (PARTIAL_COVERAGE.inProgress.find((element) => element === completeTestId)) {
                    testCoverage.inProgress++;
                    criteriaCoverage.inProgress++;
                    topicCoverage.inProgress++;
                }
                if (PARTIAL_COVERAGE.wontBeImplemented.find((element) => element === completeTestId)) {
                    testCoverage.wontBeImplemented++;
                    criteriaCoverage.wontBeImplemented++;
                    topicCoverage.wontBeImplemented++;
                }
                testCoverage.testsCount++;
                criteriaCoverage.testsCount++;
                topicCoverage.testsCount++;
                criteriaCoverage.tests.push(testCoverage);
            });
            topicCoverage.criterias.push(criteriaCoverage);
        });
        referenceCoverage.topics.push(topicCoverage);
    });

    return referenceCoverage;
}
