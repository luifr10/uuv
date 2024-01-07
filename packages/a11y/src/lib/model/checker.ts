import { A11yReference } from "./reference";
import { forkJoin, map, Observable, tap } from "rxjs";
import { A11yResult, A11yRuleResult } from "./result";
import { A11yRule } from "./rule";
import { Engine } from "../engine/engine";

export abstract class A11yChecker {
    protected constructor(readonly url: string, readonly engine: Engine, readonly reference: A11yReference) {
    }

    abstract rules(): A11yRule[];

    validate(): Observable<A11yResult> {
        const result = new A11yResult(this.url, this.reference);
        const rules: Array<A11yRule> = this.rules();
        const checkList = this.buildCheckList(rules);
        return forkJoin(checkList)
            .pipe(
                map((ruleResults) => {
                    result.ruleResults = ruleResults;
                    result.computeStatus();
                    return result;
                }),
                tap(result => {
                    console.debug("result");
                    console.debug(result);
                })
            );
    }

    private buildCheckList(rules: Array<A11yRule>): Observable<A11yRuleResult>[] {
        const checkList: Observable<A11yRuleResult>[] = [];
        rules.forEach(rule => checkList.push(this.engine.buildCheckListItemFromRule(rule)));
        return checkList;
    }
}
