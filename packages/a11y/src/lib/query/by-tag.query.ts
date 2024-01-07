import { Query } from "./00-query";
import $ from "jquery";

export class ByTagQuery implements Query {
    constructor(readonly selectors: string[]) {
    }

    execute(): HTMLElement[] {
        return $(this.selectors.join(",")).toArray();
    }

    getSelector(): string {
        return `${this.selectors}`;
    }
}
