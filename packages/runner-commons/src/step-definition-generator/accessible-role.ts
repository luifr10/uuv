export abstract class AccessibleRole {
    id!: string;
    name!: string;

    abstract getDefiniteArticle(): string;

    abstract getIndefiniteArticle(): string;

    abstract getOfDefiniteArticle(): string;

    abstract namedAdjective(): string;
}
