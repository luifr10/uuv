import { Query } from "./00-query";
import { computeAccessibleName } from "dom-accessibility-api";
import _ from "lodash";

export class AccessibleNameQuery implements Query {

    constructor(
        readonly subQuery: Query,
        readonly shouldBeEmpty: boolean
    ) {
    }

    execute(): HTMLElement[] {
        return this.subQuery.execute().filter(element => {
            const accessibleName = computeAccessibleName(element);
            if (this.shouldBeEmpty && _.isEmpty(accessibleName)) {
                return true;
            } else if (!this.shouldBeEmpty && !_.isEmpty(accessibleName)) {
                return true;
            } else {
                return false;
            }
        });
    }

    getSelector(): string {
        return `AccessibleName: ${this.subQuery.getSelector()}`;
    }
}
