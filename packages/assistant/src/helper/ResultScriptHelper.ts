import { Extension, gutter, GutterMarker } from "@uiw/react-codemirror";
import { StepCaseEnum } from "../translator/model";

const regexThen = new RegExp(`^${StepCaseEnum.THEN}`, "g");
const regexWhen = new RegExp(`^${StepCaseEnum.WHEN}`, "g");

export function buildResultingScript(featureName: string, scenarioName: string, generatedScriptStep: string[]) {
    let completeResultingScript = `Feature: ${featureName}\n`;
    completeResultingScript = completeResultingScript + `  Scenario: ${scenarioName}\n`;
    completeResultingScript = completeResultingScript + `    Given I visit path "${window.location.href}"\n`;
    let isThereAlreadyAThen = false;
    let isThereAlreadyAWhen = false;
    generatedScriptStep.forEach((step) => {
        let sanitizedStep = step;
        if (isThereAlreadyAThen) {
            sanitizedStep = sanitizedStep.replace(regexThen, StepCaseEnum.AND);
        } else {
            isThereAlreadyAThen = step.match(regexThen) != null;
        }
        if (isThereAlreadyAWhen) {
            sanitizedStep = sanitizedStep.replace(regexWhen, StepCaseEnum.AND);
        } else {
            isThereAlreadyAWhen = step.match(regexWhen) != null;
        }
        completeResultingScript = completeResultingScript + `    ${sanitizedStep}\n`;
    });
    return completeResultingScript;
}

const uuvA11yWarningMarker = new class extends GutterMarker {
    toDOM() {
        const marker = document.createElement("div");
        marker.innerHTML = "<div class='uuv-gutter-warning'>⚠️</div>";
        marker.setAttribute("title", "Accessibility role and name must be defined");
        return marker;
    }
}();

export function buildUuvGutter(): Extension {
    return gutter({
            lineMarker(view, line) {
                const value = view.state.doc.lineAt(line.from).text;
                return value.includes("selector") ? uuvA11yWarningMarker : null;
            }
        }
    );
}
