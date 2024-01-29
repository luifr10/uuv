import { Query, QueryResult } from "./00-query";
import { computeAccessibleName } from "dom-accessibility-api";
import { isEmpty, isNull } from "lodash";

export class AccessibleNameQuery implements Query {

    constructor(
        readonly subQuery: Query,
        readonly shouldBeEmpty: boolean
    ) {
    }

    execute(): QueryResult[] {
        return this.subQuery.execute().filter(element => {
            const accessibleName = computeAccessibleName(element.domNode);
            if (this.shouldBeEmpty && this.isNullOrEmpty(accessibleName)) {
                return true;
            } else if (!this.shouldBeEmpty && this.isNotNullAndNotEmpty(accessibleName)) {
                return true;
            } else {
                return false;
            }
        });
    }

    private isNullOrEmpty(accessibleName: string) {
        return isNull(accessibleName) || isEmpty(accessibleName);
    }

    private isNotNullAndNotEmpty(accessibleName: string) {
        return !isNull(accessibleName) && !isEmpty(accessibleName);
    }

    getSelector(): string {
        return `AccessibleName: ${this.subQuery.getSelector()}`;
    }
}
