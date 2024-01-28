import { AutoCheckA11yRule, ManualCheckA11yRule } from "../../../model";
import { AttributeChecker, ByTagQuery, CompliantAttributesQuery, OrQuery } from "../../../query";
import { table } from "../selector-helper";


export default [
    AutoCheckA11yRule.from({
        criterion: "5.1",
        wcag: "1.3.1 A",
        id: "5.1.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery(
                table.noCaption.buildSelector(table.selector.complex, "")
            ),
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
            new ByTagQuery(
             table.noCaption.buildSelector(
              table.hasComplexHeader.buildSelector([], "table"),
                ""
             )
            ),
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
            ...table.caption.buildSelector(table.selector.complex, ""),
            ...table.summary.buildSelector(table.selector.complex, ""),
            ...table.ariaDescribedBy.buildSelector(table.selector.complex, ""),
            ...table.caption.buildSelector(
              table.hasComplexHeader.buildSelector([], "table"),
                ""
            ),
            ...table.summary.buildSelector(
             table.hasComplexHeader.buildSelector([], "table"),
             ""
            ),
            ...table.ariaDescribedBy.buildSelector(
             table.hasComplexHeader.buildSelector([], "table"),
             ""
            )
        ]),
        description: "if present, attributes summary(before html5), aria-describedby or child tag <caption> must be relevant",
        attributes: [
            "summary",
            "aria-describedby",
            "child:caption"
        ],
        help: "adapt these attributes to be relevant"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.3",
        wcag: "1.3.2 A, 4.1.2 A",
        id: "5.3.1",
        elementType: "table",
        query: new ByTagQuery([
            table.selector.withFormatting,
        ]),
        description: "table with presentation role must have revelant content",
        attributes: [
            "child:td"
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
                ...table.noCaption.buildSelector([table.selector.withData], "table"),
            ]),
            [
                AttributeChecker.emptyAttribute("title"),
                AttributeChecker.emptyAttribute("aria-label"),
                AttributeChecker.emptyHtmlNodeTargetedByTheAttribute("aria-labelledby"),
            ]
        ),
        description: "table must have title",
        attributes: [
            "child:caption",
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
            ...table.caption.buildSelector([table.selector.withData], "table"),
            ...table.title.buildSelector([table.selector.withData], "table"),
            ...table.ariaLabel.buildSelector([table.selector.withData], "table"),
            ...table.ariaLabelledBy.buildSelector([table.selector.withData], "table"),
        ]),
        description: "table must have a revelant title",
        attributes: [
            "child:caption",
            "title",
            "aria-label",
            "aria-labelledby"
        ],
        help: "adapt one of these attributes to be revelant"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.6",
        wcag: "1.3.1 A",
        id: "5.6.1",
        elementType: "table",
        query: new ByTagQuery([
            table.selector.withData, "[role=table]"
         ]),
        description: "table column header must be set properly",
        help: "each table column header must be set with tag <th> or role=\"columnheader\""
    }),
    ManualCheckA11yRule.from({
        criterion: "5.6",
        wcag: "1.3.1 A",
        id: "5.6.2",
        elementType: "table",
        query: new ByTagQuery([
            table.selector.withData, "[role=table]"
        ]),
        description: "table line header must be set properly",
        help: "each table line header must be set with tag <th> or role=\"rowheader\""
    }),
    ManualCheckA11yRule.from({
        criterion: "5.6",
        wcag: "1.3.1 A",
        id: "5.6.3",
        elementType: "table",
        query: new ByTagQuery([
            table.selector.withData, "[role=table]"
        ]),
        description: "each header does not apply to the entire row or column must be set properly"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.6",
        wcag: "1.3.1 A",
        id: "5.6.4",
        elementType: "table",
        query: new ByTagQuery([
            table.selector.withData, "[role=table]"
        ]),
        description: "each cell associated with several headers structured using a <th> or <td> tag"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                ...table.thColumnHeader.buildSelector([table.selector.withData], "table"),
            ]),
            [
                AttributeChecker.notUniqueId(),
                AttributeChecker.emptyAttribute("scope"),
                AttributeChecker.notEquals("role", ["rowheader", "columnheader"])
            ]
        ),
        description: "Table column header attributes",
        help: "Correctly set table column header attributes"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.1",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                ...table.thRowHeader.buildSelector([table.selector.withData], "table"),
            ]),
            [
                AttributeChecker.notUniqueId(),
                AttributeChecker.emptyAttribute("scope"),
                AttributeChecker.notEquals("role", ["rowheader", "columnheader"])
            ]
        ),
        description: "Table row header attributes",
        help: "Correctly set table row header attributes"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.2",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                ...table.thColumnHeader.buildSelector([table.selector.withData], "table"),
            ]),
            [
                AttributeChecker.notEmptyAttribute("scope"),
                AttributeChecker.notEquals("scope", ["col"])
            ]
        ),
        description: "Table column header scope attribute",
        help: "Set table column header scope attribute to col"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.2",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                ...table.thRowHeader.buildSelector([table.selector.withData], "table"),
            ]),
            [
                AttributeChecker.notEmptyAttribute("scope"),
                AttributeChecker.notEquals("scope", ["row"])
            ]
        ),
        description: "Table row header scope attribute",
        help: "Set table column header scope attribute to row"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.3",
        elementType: "table",
        query: new OrQuery([
            new CompliantAttributesQuery(
                new ByTagQuery([
                    "table:not([role=presentation]) tr:not(:first-child) th:not(:first-child)"
                ]),
                [
                    AttributeChecker.notUniqueId()
                ]
            ),
            new CompliantAttributesQuery(
                new ByTagQuery([
                    "table:not([role=presentation]) tr:not(:first-child) th:not(:first-child)"
                ]),
                [
                    AttributeChecker.notEmptyAttribute("scope")
                ]
            ),
            new CompliantAttributesQuery(
                new ByTagQuery([
                    "table:not([role=presentation]) tr:not(:first-child) th:not(:first-child)"
                ]),
                [
                    AttributeChecker.equals("role", ["rowheader", "columnheader"])
                ]
            )
        ]),
        description: "each header does not apply to the entire row or column must be set properly"
    }),
    ManualCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.4",
        elementType: "table",
        query: new ByTagQuery([
            table.selector.withData, "[role=table]"

        ]),
        description: "Each cell associated with several headers, the header attribute must be filled in correctly.",
        help: "Each cell associated with several headers, the header attribute must contain the list of ids referring to the target headers."
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.5",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not([role=presentation]) tr:first-child th",
                "[role=table] tr:first-child th"
            ]),
            [
                AttributeChecker.notEmptyAttribute("role"),
                AttributeChecker.notEquals("role", ["columnheader"])
            ]
        ),
        description: "Table column header role attribute",
        help: "Set table column header role attribute to 'columnheader'"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.7",
        wcag: "1.3.1 A",
        id: "5.7.5",
        elementType: "table",
        query: new CompliantAttributesQuery(
            new ByTagQuery([
                "table:not([role=presentation]) tr:not(:first-child) th:first-child",
                "[role=table] tr:not(:first-child) th:first-child"
            ]),
            [
                AttributeChecker.notEmptyAttribute("role"),
                AttributeChecker.notEquals("role", ["rowheader"])
            ]
        ),
        description: "Table row header role attribute",
        help: "Set table row header role attribute to 'rowheader'"
    }),
    AutoCheckA11yRule.from({
        criterion: "5.8",
        wcag: "1.3.1 A",
        id: "5.8.1",
        elementType: "table",
        query: new ByTagQuery([
            table.selector.withFormatting + "[summary]",
            table.selector.withFormatting + ":has(caption)",
            table.selector.withFormatting + ":has(thead)",
            table.selector.withFormatting + ":has(th)",
            table.selector.withFormatting + ":has(tfoot)",
            table.selector.withFormatting + " :has(> [role=rowheader])",
            table.selector.withFormatting + " :has(> [role=columnheader])",
            table.selector.withFormatting + " td[scope]",
            table.selector.withFormatting + " td[headers]",
            table.selector.withFormatting + " td[axis]",
        ]),
        description: "table with presentation role must have revelant content",
        attributes: [
            "child:td"
        ],
        help: "adapt these <td> children content to be relevant"
    })
];

