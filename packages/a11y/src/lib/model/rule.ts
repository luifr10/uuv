import { Query } from "../query/00-query";

export interface A11yRule {
    attributes: string[];
    reference: string;
    check: RuleCheckEnum;
    criterion: string;
    wcag: string;
    id: string;
    elementType: string;
    query: Query;
    description?: string;
    help?: string | string[];
    shouldNotExist: boolean;
}

export class AutoCheckA11yRule implements A11yRule {
    attributes!: string[];
    reference!: string;
    check = RuleCheckEnum.AUTO;
    criterion!: string;
    wcag!: string;
    id!: string;
    elementType !: string;
    query!: Query;
    description?: string;
    help?: string | string[];
    shouldNotExist = true;

    static from(input: {
        attributes?: string[];
        reference: string;
        criterion: string;
        wcag: string;
        id: string;
        elementType: string;
        query: Query;
        description?: string;
        help?: string | string[];
        shouldNotExist?: boolean;
    }) {
        return Object.assign(new AutoCheckA11yRule(), input);
    }
}

export class ManualCheckA11yRule implements A11yRule {
    attributes: string[] = [];
    reference!: string;
    check = RuleCheckEnum.MANUAL;
    criterion!: string;
    wcag!: string;
    id!: string;
    elementType !: string;
    query!: Query;
    description?: string;
    help?: string | string[];
    shouldNotExist = true;

    static from(input: {
        attributes?: string[];
        reference: string;
        criterion: string;
        wcag: string;
        id: string;
        elementType: string;
        query: Query;
        description?: string;
        help?: string;
        shouldNotExist?: boolean;
    }) {
        return Object.assign(new ManualCheckA11yRule(), input);
    }
}

export enum RuleCheckEnum {
    MANUAL = "MANUAL",
    AUTO = "AUTO"
}

export enum CustomFilter {
    DOCTYPE = "$DOCTYPE",
    FORM_FIELD = "$FORMFIELD",
}

export enum RuleTypeEnum {
    TAG = "TAG",
    ROLE = "ROLE",
    COLOR = "COLOR"
}
