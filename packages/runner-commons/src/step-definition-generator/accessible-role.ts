export abstract class AccessibleRole {
    id!: string;
    name!: string;
    shouldGenerateTypeSentence!: boolean;
    shouldGenerateContainsSentence!: boolean;
    shouldGenerateKeyboardSentence = false;
    shouldGenerateCheckedSentence = false;

    abstract getDefiniteArticle(): string;

    abstract getIndefiniteArticle(): string;

    abstract getOfDefiniteArticle(): string;

    abstract namedAdjective(): string;
}
