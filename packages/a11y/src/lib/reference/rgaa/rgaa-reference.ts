import { A11yReference } from "../../model";
import { buildCoverage } from "./coverage/coverage-helper";
import { REFERENCE_NAME, REFERENCE_VERSION } from "./common";
import RGAA_IMAGE_RULES from "./rules/1-image";
import RGAA_FRAME_RULES from "./rules/2-frame";
import RGAA_COLOR_RULES from "./rules/3-color";
import RGAA_MULTIMEDIA_RULES from "./rules/4-multimedia";
import RGAA_TABLE_RULES from "./rules/5-table";
import RGAA_LINK_RULES from "./rules/6-link";
import RGAA_SCRIPT_RULES from "./rules/7-script";
import RGAA_REQUIRED_ELEMENT_RULES from "./rules/8-required-element";
import RGAA_STRUCTURE_RULES from "./rules/9-structure";
import RGAA_DISPLAY_RULES from "./rules/10-display";
import RGAA_FORM_RULES from "./rules/11-form";
import RGAA_NAVIGATION_RULES from "./rules/12-navigation";
import RGAA_VISIT_RULES from "./rules/13-visit";


const RGAA_REFERENCE_URL = "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests";
export const A11Y_RGAA_REFERENCE : A11yReference = {
    name: REFERENCE_NAME,
    version: REFERENCE_VERSION,
    url: RGAA_REFERENCE_URL,
    rules: [
        ...RGAA_IMAGE_RULES,
        ...RGAA_FRAME_RULES,
        ...RGAA_COLOR_RULES,
        ...RGAA_MULTIMEDIA_RULES,
        ...RGAA_TABLE_RULES,
        ...RGAA_LINK_RULES,
        ...RGAA_SCRIPT_RULES,
        ...RGAA_REQUIRED_ELEMENT_RULES,
        ...RGAA_STRUCTURE_RULES,
        ...RGAA_DISPLAY_RULES,
        ...RGAA_FORM_RULES,
        ...RGAA_NAVIGATION_RULES,
        ...RGAA_VISIT_RULES
    ],
    coverage: buildCoverage,
    getRuleUrl: (ruleId: string) => `${RGAA_REFERENCE_URL}/#${ruleId}`
};
