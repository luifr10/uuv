import { Query } from "./00-query";
import { queryAllByRole } from "@testing-library/dom";

export class ByRoleQuery implements Query {
    constructor(
        readonly role: string,
        readonly attributes: string[] = []
    ) {
    }

    execute(): HTMLElement[] {
        return queryAllByRole(window.document.documentElement, this.role)
            ?.filter((element: HTMLElement) => {
                if (this.attributes.length == 0 ) {
                    return true;
                }
                return this.attributes.filter(value => {
                    return element.getAttribute(value);
                }).length > 0;
            });
    }

    getSelector(): string {
        return `ByRole(${this.role}, ${this.attributes})`;
    }
}
