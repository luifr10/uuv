import { AutoCheckA11yRule, ManualCheckA11yRule } from "../../../model";
import { ByTagQuery, DoctypeQuery } from "../../../query";

export default [
  AutoCheckA11yRule.from({
    criterion: "8.1",
    wcag: "4.1.1 A",
    id: "8.1.1",
    elementType: "doctype",
    query: new DoctypeQuery(),
    description: "current page has no doctype or a doctype different to html",
    help: "add <!DOCTYPE html> in the current page"
  }),
  AutoCheckA11yRule.from({
    criterion: "8.3",
    wcag: "3.1.1 A",
    id: "8.3.1",
    elementType: "lang",
    query: new ByTagQuery([
      "html:not([lang]):not([xml\\:lang])"
    ]),
    description: "current page has no language specified",
    help: "add lang attribute to html tag"
  }),
  ManualCheckA11yRule.from({
    criterion: "8.4",
    wcag: "3.1.1 A",
    id: "8.4.1",
    elementType: "lang",
    query: new ByTagQuery([
      "html[lang]",
      "html[xml\\:lang]"
    ]),
    description: "if present, attributes lang, xml:lang must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  AutoCheckA11yRule.from({
    criterion: "8.5",
    wcag: "2.4.2 A",
    id: "8.5.1",
    elementType: "title",
    query: new ByTagQuery([
      "title"
    ]),
    description: "current page has no title tag",
    help: "add a title tag to the current page"
  }),
  ManualCheckA11yRule.from({
    criterion: "8.6",
    wcag: "2.4.2 A",
    id: "8.6.1",
    elementType: "mandatory - title",
    query: new ByTagQuery([
      "title"
    ]),
    attributes: [],
    description: "if present, title tag must be relevant",
    help: "adapt this tag content"
  }),
  AutoCheckA11yRule.from({
    criterion: "8.10",
    wcag: "1.3.2 A",
    id: "8.10.1",
    elementType: "mandatory - reading",
    query: new ByTagQuery([
      "[dir]:not([dir='rtl'], [dir='ltr'], [dir='auto'])"
    ]),
    description: "if present, dir attribute must be relevant",
    help: "adapt value of dir attribute"
  })
];
