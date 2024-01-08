import { Query, QueryResult } from "./00-query";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const $ = require("jquery/dist/jquery.min");

export class ByTagQuery implements Query {
    constructor(readonly selectors: string[]) {
    }

    execute(): QueryResult[] {
        return $(this.selectors.join(",")).toArray().map((element: HTMLElement) => new QueryResult(element));
    }

    getSelector(): string {
        return `${this.selectors}`;
    }
}
