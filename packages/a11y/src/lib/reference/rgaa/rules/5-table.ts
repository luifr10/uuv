import {AutoCheckA11yRule, ManualCheckA11yRule} from "../../../model";
import {AttributeChecker, ByTagQuery, CompliantAttributesQuery, OrQuery} from "../../../query";


export default [
    AutoCheckA11yRule.from({
        criterion: "5.1",
        wcag: "1.3.1 A",
        id: "5.1.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not(:has(> caption)), table > caption:empty"
            ]),
            [
                AttributeChecker.emptyAttribute("summary"),
                AttributeChecker.emptyHtmlNodeTargetedByTheAttribute("aria-describedby"),
            ]
        ),
        description: "Table tag without summary",
        help: "set a summary to table"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.1",
        wcag: "1.3.1 A",
        id: "5.1.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "[role=table]:not(:has(> caption)), [role=table]:has(> caption:empty)"
            ]),
            [
                AttributeChecker.emptyHtmlNodeTargetedByTheAttribute("aria-describedby"),
            ]
        ),
        description: "Element with role table without summary",
        help: "set a summary to table"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.2",
        wcag: "1.3.1 A",
        id: "5.2.1",
        elementType: "table",
        query: new ByTagQuery([
            "table > caption:not(:empty)",
            "table[summary]:not([summary=''])",
            "table[aria-describedby]:not([aria-describedby=''])",
            "[role=table] > caption:not(:empty)",
            "[role=table][summary]:not([summary=''])",
            "[role=table][aria-describedby]:not([aria-describedby=''])",
        ]),
        description: "if present, attributes summary(before html5), aria-describedby or child tag <caption> must be relevant",
        attributes: [
            "summary(before html5)",
            "aria-describedby",
            "child tag <caption>"
        ],
        help: "adapt these attributes to be relevant"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.3",
        wcag: "1.3.2 A, 4.1.2 A",
        id: "5.3.1",
        elementType: "table",
        query: new ByTagQuery([
            "table[role=presentation]",
        ]),
        description: "table with presentation role must have revelant content",
        attributes: [
            "child tag <td>"
        ],
        help: "adapt these <td> children content to be relevant"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.4",
        wcag: "1.3.1 A",
        id: "5.4.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not([role=presentation]):not(:has(> caption)), table:not([role=presentation]) > caption:empty",
                "[role=table]:not(:has(> caption)), [role=table]:has(> caption:empty)"
            ]),
            [
                AttributeChecker.emptyAttribute("title"),
                AttributeChecker.emptyAttribute("aria-label"),
                AttributeChecker.emptyHtmlNodeTargetedByTheAttribute("aria-labelledby"),
            ]
        ),
        description: "table must have title",
        attributes: [
            "child tag <caption>",
            "title",
            "aria-label",
            "aria-labelledby"
        ],
        help: "set one of these attributes"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.5",
        wcag: "1.3.1 A",
        id: "5.5.1",
        elementType: "table",
        query: new ByTagQuery([
            "table > caption:not(:empty)",
            "table[title]:not([title=''])",
            "table[aria-label]:not([aria-label=''])",
            "table[aria-labelledby]:not([aria-labelledby=''])",
            "[role=table] > caption:not(:empty)",
            "[role=table][title]:not([title=''])",
            "[role=table][aria-label]:not([aria-label=''])",
            "[role=table][aria-labelledby]:not([aria-labelledby=''])"
        ]),
        description: "table must have a revelant title",
        attributes: [
            "child tag <caption>",
            "title",
            "aria-label",
            "aria-labelledby"
        ],
        help: "adapt one of these attributes to be revelant"
    })
];

