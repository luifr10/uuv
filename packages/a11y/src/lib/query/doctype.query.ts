import { Query, QueryResult } from "./00-query";

export class DoctypeQuery implements Query {

    execute(): QueryResult[] {
        if (document?.doctype?.name !== "html") {
            return [new QueryResult(document.documentElement)];
        }
        return [];
    }

    getSelector(): string {
        return "doctype";
    }
}
