import { AutoCheckA11yRule, ManualCheckA11yRule } from "../../../model";
import { AccessibleNameQuery, AttributeChecker, ByTagQuery, CompliantAttributesQuery } from "../../../query";

const SELECTOR_ALL_LINK = [
  "a",
  "[role=link]"
];

const SELECTOR_LINK_TEXT = [
  ":not(svg) > a[href]:not(:has(img)):not(:has([role=img])):not(:has(object)):not(:has(canvas)):not(:has(svg))",
  ":not(svg) > [role=link]:not(:has(img)):not(:has([role=img])):not(:has(object)):not(:has(canvas)):not(:has(svg))"
];

const SELECTOR_LINK_CONTAINING_IMAGE = [
  ":not(svg) > a[href]:has(img)",
  ":not(svg) > a[href]:has([role=img])",
  ":not(svg) > a[href]:has(area[href])",
  ":not(svg) > a[href]:has(object)",
  ":not(svg) > a[href]:has(canvas)",
  ":not(svg) > a[href]:has(svg)",
  ":not(svg) > [role=link]:has(img)",
  ":not(svg) > [role=link]:has([role=img])",
  ":not(svg) > [role=link]:has(area[href])",
  ":not(svg) > [role=link]:has(object)",
  ":not(svg) > [role=link]:has(canvas)",
  ":not(svg) > [role=link]:has(svg)"
];

const SELECTOR_LINK_SVG = [
  "svg:has(a[href])",
  "svg:has(a[xlink-href])"
];

const IMAGE_LINK_QUERY = new CompliantAttributesQuery(
 new ByTagQuery([
   ...SELECTOR_LINK_CONTAINING_IMAGE
 ]),
 [
   AttributeChecker.emptyText()
 ]
);

const COMPOSITE_LINK_QUERY = new CompliantAttributesQuery(
 new ByTagQuery([
   ...SELECTOR_LINK_CONTAINING_IMAGE
 ]),
 [
   AttributeChecker.notEmptyText()
 ]
);

export default [
  AutoCheckA11yRule.from({
    criterion: "6.1",
    wcag: "1.1.1 A, 2.4.4 A, 2.5.3 A",
    id: "6.1.1",
    elementType: "link",
    query:
     new AccessibleNameQuery(
      new ByTagQuery([
        ...SELECTOR_LINK_TEXT
      ]),
      true
     ),
    description: "text link must be explicit",
    help: "Check link accessible name or link context"
  }),
  ManualCheckA11yRule.from({
    criterion: "6.1",
    wcag: "1.1.1 A, 2.4.4 A, 2.5.3 A",
    id: "6.1.1",
    elementType: "link",
    query: new AccessibleNameQuery(
     new ByTagQuery([
       ...SELECTOR_LINK_TEXT
     ]),
     false
    ),
    description: "text link must be explicit",
    help: "Check link accessible name or link context"
  }),
  AutoCheckA11yRule.from({
    criterion: "6.1",
    wcag: "1.1.1 A, 2.4.4 A, 2.5.3 A",
    id: "6.1.2",
    elementType: "link",
    query:
     new AccessibleNameQuery(
      IMAGE_LINK_QUERY,
      true
     ),
    description: "image link must be explicit",
    help: "Check link accessible name or link context"
  }),
  ManualCheckA11yRule.from({
    criterion: "6.1",
    wcag: "1.1.1 A, 2.4.4 A, 2.5.3 A",
    id: "6.1.2",
    elementType: "link",
    query: new AccessibleNameQuery(
     IMAGE_LINK_QUERY,
     false
    ),
    description: "image link must be explicit",
    help: "Check link accessible name or link context"
  }),
  ManualCheckA11yRule.from({
    criterion: "6.1",
    wcag: "1.1.1 A, 2.4.4 A, 2.5.3 A",
    id: "6.1.3",
    elementType: "link",
    query:
     new AccessibleNameQuery(
      COMPOSITE_LINK_QUERY,
      false
     ),
    description: "image link must be explicit",
    help: "Check link accessible name or link context"
  }),
  AutoCheckA11yRule.from({
    criterion: "6.1",
    wcag: "1.1.1 A, 2.4.4 A, 2.5.3 A",
    id: "6.1.4",
    elementType: "link",
    query:
     new AccessibleNameQuery(
      new ByTagQuery([
        ...SELECTOR_LINK_SVG
      ]),
      true
     ),
    description: "svg link must be explicit",
    help: "Check link accessible name or link context"
  }),
  ManualCheckA11yRule.from({
    criterion: "6.1",
    wcag: "1.1.1 A, 2.4.4 A, 2.5.3 A",
    id: "6.1.4",
    elementType: "link",
    query: new AccessibleNameQuery(
     new ByTagQuery([
       ...SELECTOR_LINK_SVG
     ]),
     false
    ),
    description: "svg link must be explicit",
    help: "Check link accessible name or link context"
  }),
  AutoCheckA11yRule.from({
    criterion: "6.1",
    wcag: "1.1.1 A, 2.4.4 A, 2.5.3 A",
    id: "6.1.5",
    elementType: "link",
    query: new CompliantAttributesQuery(
     new ByTagQuery([
       ...SELECTOR_LINK_TEXT,
       ...SELECTOR_LINK_CONTAINING_IMAGE
     ]),
     [
       AttributeChecker.accessibleNameNotContainsVisibleText()
     ]
    ),
    description: "Accessible name must contains visible text for text link and image link",
    help: "Accessible name must contains visible text for text link and image link"
  }),
  ManualCheckA11yRule.from({
    criterion: "6.1",
    wcag: "1.1.1 A, 2.4.4 A, 2.5.3 A",
    id: "6.1.5",
    elementType: "link",
    query: new ByTagQuery([
      ...SELECTOR_LINK_SVG
    ]),
    description: "Accessible name must contains visible text for svg link",
    help: "Accessible name must contains visible text for svg link"
  }),
  AutoCheckA11yRule.from({
    criterion: "6.2",
    wcag: "1.1.1 A, 2.4.4 A",
    id: "6.2.1",
    elementType: "link",
    query: new AccessibleNameQuery(
     new ByTagQuery([
       ...SELECTOR_ALL_LINK
     ]),
     true
    ),
    description: "Every link must have an accessible name",
    help: "Every link must have an accessible name"
  })
];
