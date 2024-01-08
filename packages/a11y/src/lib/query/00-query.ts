
export interface Query {
    execute(): QueryResult[];
    getSelector(): string;
}

export class QueryResult {
    constructor(readonly domNode: HTMLElement, readonly linkedNodes: HTMLElement[] = []) {}
}
