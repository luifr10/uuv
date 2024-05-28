import { Extension, gutter, GutterMarker } from "@uiw/react-codemirror";

export function buildResultingScript(featureName: string, scenarioName: string, generatedScriptStep: string[]) {
    let completeResultingScript = `Feature: ${featureName}\n`;
    completeResultingScript = completeResultingScript + `  Scenario: ${scenarioName}\n`;
    completeResultingScript = completeResultingScript + `    Given I visit path "${window.location.href}"\n`;
    generatedScriptStep.forEach((step, index) => {
        completeResultingScript = completeResultingScript + `    ${index < 2 ? step : step.replace(/^Then/g, "And")}\n`;
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
