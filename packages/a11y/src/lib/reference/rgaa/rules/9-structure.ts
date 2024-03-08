import { ManualCheckA11yRule } from "../../../model";
import { ByTagQuery } from "../../../query";


const SELECTOR_HEADING = [
    "h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role])",
    "[role='heading'][aria-level='1'], [role='heading'][aria-level='2'], [role='heading'][aria-level='3'], [role='heading'][aria-level='4'], [role='heading'][aria-level='5'], [role='heading'][aria-level='6']",
];

export default [
    ManualCheckA11yRule.from({
        criterion: "9.1",
        wcag: "1.3.1 A,  2.4.1 A,  2.4.6 AA, 4.1.2 A",
        id: "9.1.1",
        elementType: "heading",
        query: new ByTagQuery(SELECTOR_HEADING),
        description: "if present, headings must respect the hierarchy",
        help: "Check that the headings hierarchy is appropriate"
    }),
    ManualCheckA11yRule.from({
        criterion: "9.1",
        wcag: "1.3.1 A,  2.4.1 A,  2.4.6 AA, 4.1.2 A",
        id: "9.1.2",
        elementType: "heading",
        query: new ByTagQuery(SELECTOR_HEADING),
        description: "if present, headings must respect the hierarchy",
        help: "Check that the headings hierarchy is appropriate"
    }),
    ManualCheckA11yRule.from({
        criterion: "9.1",
        wcag: "1.3.1 A,  2.4.1 A,  2.4.6 AA, 4.1.2 A",
        id: "9.1.3",
        elementType: "heading",
        query: new ByTagQuery([
            "html"
        ]),
        description: "Is every passage of text making up a heading structured using a <hx> tag or a tag with a WAI-ARIA attribute ?",
        help: "Identified the text passages that make up a heading in order to structure them using a <hx> tag or a tag with a WAI-ARIA attribute"
    })
];
