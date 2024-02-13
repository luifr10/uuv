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
    help: "add <!DOCTYPE html> before html tag in the current page"
  }),
  AutoCheckA11yRule.from({
    criterion: "8.1",
    wcag: "4.1.1 A",
    id: "8.1.2",
    elementType: "doctype",
    query: new DoctypeQuery(),
    description: "current page has no doctype or a doctype different to html",
    help: "add <!DOCTYPE html> before html tag in the current page"
  }),
  AutoCheckA11yRule.from({
    criterion: "8.1",
    wcag: "4.1.1 A",
    id: "8.1.3",
    elementType: "doctype",
    query: new DoctypeQuery(),
    description: "current page has no doctype or a doctype different to html",
    help: "add <!DOCTYPE html> before html tag in the current page"
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
      "html:not(:has(title))"
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
  ManualCheckA11yRule.from({
    criterion: "8.7",
    wcag: "3.1.2 AA",
    id: "8.7.1",
    elementType: "lang",
    query: new ByTagQuery([
      "html"
    ]),
    attributes: [],
    description: "if present, language switch must be specified",
    help: "wrap concerned text with lang or xml:lang attribute"
  }),
  ManualCheckA11yRule.from({
    criterion: "8.8",
    wcag: "3.1.2 AA",
    id: "8.8.1",
    elementType: "lang",
    query: new ByTagQuery([
      ":not(html)[lang]",
      ":not(html)[xml\\:lang]"
    ]),
    attributes: [],
    description: "if present, language switch must be revelant",
    help: "check concerned lang or xml:lang attribute"
  }),
  AutoCheckA11yRule.from({
    criterion: "8.10",
    wcag: "1.3.2 A",
    id: "8.10.1",
    elementType: "mandatory - reading",
    query: new ByTagQuery([
      "[dir]:not([dir='rtl'], [dir='ltr'], [dir='auto'])"
    ]),
    description: "if present, dir attribute must be compliant",
    help: "adapt value of dir attribute"
  }),
  ManualCheckA11yRule.from({
    criterion: "8.10",
    wcag: "1.3.2 A",
    id: "8.10.2",
    elementType: "mandatory - reading",
    query: new ByTagQuery([
      "[dir='rtl'], [dir='ltr']"
    ]),
    description: "if present, dir attribute must be compliant",
    help: "adapt value of dir attribute"
  })
];
