import { AutoCheckA11yRule, ManualCheckA11yRule } from "../../../model";
import { AttributeChecker, ByTagQuery, CompliantAttributesQuery } from "../../../query";

export default [
  AutoCheckA11yRule.from({
    criterion: "2.1",
    wcag: "4.1.2 A",
    id: "2.1.1",
    elementType: "iframe",
    query: new CompliantAttributesQuery(
     new ByTagQuery([
       "iframe", "frame"
     ]),
     [
       AttributeChecker.emptyAttribute("title"),
     ]
    ),
    description: "iframe has no title",
    help: "set a title to iframe"
  }),
  ManualCheckA11yRule.from({
    criterion: "2.2",
    wcag: "4.1.2 A",
    id: "2.2.1",
    elementType: "iframe",
    query: new CompliantAttributesQuery(
     new ByTagQuery([
       "iframe", "frame"
     ]),
     [
       AttributeChecker.notEmptyAttribute("title"),
     ]
    ),
    attributes: [
      "title"
    ],
    description: "if present, attributes title must be relevant",
    help: "adapt this attribute"
  })
];
