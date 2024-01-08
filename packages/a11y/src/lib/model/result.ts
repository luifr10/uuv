import { A11yRule } from "./rule";
import { A11yReference } from "./reference";
import { QueryResult } from "../query";

export enum A11yResultStatus {
  UNKNOWN = "unknown",
  SUCCESS = "success",
  MANUAL = "manual",
  ERROR = "error"
}

export interface NonCompliantNode {
    node?: HTMLElement,
    selector: string,
    html?: string
}
export interface NodeToCheckManually {
  node: QueryResult;
  selector: string;
  attributes: string;
  html: string;
  help: string;
}

export class A11yRuleValidationResult {
  status: A11yResultStatus = A11yResultStatus.UNKNOWN;
  errorNodes: NonCompliantNode[] = [];
  nodesToCheckManually: NodeToCheckManually[] = [];
  constructor(
      readonly criteria: string
  ) {
  }
}

export class A11yRuleResult {
  status: A11yResultStatus = A11yResultStatus.UNKNOWN;
  validations: A11yRuleValidationResult[] = [];
  constructor(
      readonly url: string,
      readonly rule: A11yRule
  ) {}

  getOrAddValidation(criteria: string) : A11yRuleValidationResult {
    let validation = this.validations.find(value => value.criteria === criteria);
    if (!validation) {
      validation = new A11yRuleValidationResult(criteria);
      this.validations.push(validation);
    }
    return validation;
  }

  getErrorNodes(): NonCompliantNode[] {
    let nodeFound: NonCompliantNode[] = [];
    this.validations.forEach(validation => {
      nodeFound = nodeFound.concat(validation.errorNodes);
    });
    return nodeFound;
  }

  getNodesToCheckManually(): NodeToCheckManually[] {
    let nodeFound: NodeToCheckManually[] = [];
    this.validations.forEach(validation => {
      nodeFound = nodeFound.concat(validation.nodesToCheckManually);
    });
    return nodeFound;
  }

  computeStatus() {
    this.status = this.getStatus();
  }

  private getStatus(): A11yResultStatus {
    if (this.validations.find(validation => validation.status === A11yResultStatus.UNKNOWN)) {
      return A11yResultStatus.UNKNOWN;
    }
    if (this.validations.find(validation => validation.status === A11yResultStatus.ERROR)) {
      return A11yResultStatus.ERROR;
    }
    if (this.validations.find(validation => validation.status === A11yResultStatus.MANUAL)) {
      return A11yResultStatus.MANUAL;
    }
    return A11yResultStatus.SUCCESS;
  }
}

export class A11yResult {
  status: A11yResultStatus = A11yResultStatus.UNKNOWN;
  ruleResults: A11yRuleResult[] = [];

  constructor(
      readonly url: string,
      readonly reference: A11yReference
  ) {
  }

  computeStatus() {
    this.status = computeStatus(this.ruleResults);
  }

  summary() {
    const summary = {
      status: this.status,
      criteria: {}
    };
    this.groupRuleResultByCriterion().forEach((rulesResult, key) => {
      summary.criteria[key] = this.buildSummaryForCriterion(key, rulesResult);
    });
    return summary;
  }

  private buildSummaryForCriterion(criterion: string, criterionRulesResult: A11yRuleResult[]) {
    const criterionSummary = {
      status: computeStatus(criterionRulesResult),
      tests: {}
    };
    this.groupRuleResultByTestOfACriterion(criterion).forEach((rulesResult, key) => {
      criterionSummary.tests[key] = {
        status: computeStatus(rulesResult)
      };
    });
    return criterionSummary;
  }

  private getPosition(inputString, subString, index) {
    return inputString.split(subString, index).join(subString).length;
  }

  private groupRuleResultByLevel(ruleResults: A11yRuleResult[], level: number) {
    const ruleResultPerCriteria: Map<string, A11yRuleResult[]> = new Map();
    ruleResults.forEach(ruleResult => {
      const key = this.getKeyOfLevel(ruleResult, level);
      if (!ruleResultPerCriteria.has(key)) {
        ruleResultPerCriteria.set(key, []);
      }
      ruleResultPerCriteria.get(key)?.push(ruleResult);
    });
    return ruleResultPerCriteria;
  }

  private getKeyOfLevel(ruleResult: A11yRuleResult, level: number) {
    const nextLevelPosition = this.getPosition(ruleResult.rule.id, ".", level + 1);
    return ruleResult.rule.id.substring(0, nextLevelPosition > 0 ? nextLevelPosition : undefined);
  }

  private groupRuleResultByCriterion(): Map<string, A11yRuleResult[]> {
    return this.groupRuleResultByLevel(this.ruleResults, 1);
  }

  private groupRuleResultByTestOfACriterion(criterion: string): Map<string, A11yRuleResult[]> {
    return this.groupRuleResultByLevel(
        this.ruleResults.filter(ruleResult => criterion === this.getKeyOfLevel(ruleResult, 1)),
        2
    );
  }
}

const computeStatus = (ruleResults: A11yRuleResult[]): A11yResultStatus  => {
  ruleResults.forEach(ruleResult => ruleResult.computeStatus());
  return getStatus(ruleResults);
};

const getStatus = (ruleResults: A11yRuleResult[]) => {
  if (ruleResults.find(ruleResult => ruleResult.status === A11yResultStatus.UNKNOWN)) {
    return A11yResultStatus.UNKNOWN;
  }
  if (ruleResults.find(ruleResult => ruleResult.status === A11yResultStatus.ERROR)) {
    return A11yResultStatus.ERROR;
  }
  if (ruleResults.find(ruleResult => ruleResult.status === A11yResultStatus.MANUAL)) {
    return A11yResultStatus.MANUAL;
  }
  return A11yResultStatus.SUCCESS;
};
