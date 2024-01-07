import { Query } from "./00-query";

export class DoctypeQuery implements Query {

    execute(): HTMLElement[] {
        if (document?.doctype?.name !== "html") {
            return [document.documentElement];
        }
        return [];
    }

    getSelector(): string {
        return "doctype";
    }
}
