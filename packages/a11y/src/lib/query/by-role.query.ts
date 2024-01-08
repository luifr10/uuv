import { Query, QueryResult } from "./00-query";
import { queryAllByRole } from "@testing-library/dom";
import _ from "lodash";

export class ByRoleQuery implements Query {
    constructor(
        readonly role: string,
        readonly attributes: string[] = [],
        readonly excludedTags: string[] = []
    ) {
    }

    execute(): QueryResult[] {
        return queryAllByRole(window.document.documentElement, this.role)
            ?.filter((element: HTMLElement) => {
                if (_.isEmpty(this.attributes) && _.isEmpty(this.excludedTags)) {
                    return true;
                }
                const foundExcludedTags = this.excludedTags.filter(value => {
                    return element.tagName.toLowerCase() === value;
                });
                const foundAttributes = this.attributes.filter(value => {
                    return element.getAttribute(value);
                });
                const hasFoundExcludedTags: boolean = !_.isEmpty(this.excludedTags) && !_.isEmpty(foundExcludedTags);
                const hasFoundAttributes: boolean = !_.isEmpty(this.attributes) && !_.isEmpty(foundAttributes);
                return (!hasFoundExcludedTags &&
                    hasFoundAttributes) ||
                    _.isEmpty(this.excludedTags) && hasFoundAttributes ||
                    _.isEmpty(this.attributes) && !hasFoundExcludedTags;

            }).map((element) => new QueryResult(element));
    }

    getSelector(): string {
        return `ByRole(${this.role}, ${this.excludedTags}, ${this.attributes})`;
    }
}
