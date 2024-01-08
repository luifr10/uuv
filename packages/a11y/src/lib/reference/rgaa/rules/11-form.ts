import { AutoCheckA11yRule } from "../../../model";
import { FormQuery } from "../../../query";

export default [
    AutoCheckA11yRule.from({
        criterion: "11.1",
        wcag: "1.3.1 A, 2.4.6 AA, 3.3.2 A, 4.1.2 A",
        id: "11.1.1",
        elementType: "form - label",
        query: new FormQuery(),
        description: "one of attributes aria-labelledby, aria-label, title, for, must be defined",
        help: "define one of attributes"
    })
];
