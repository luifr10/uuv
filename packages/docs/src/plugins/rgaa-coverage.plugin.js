import * as Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { A11Y_RGAA_REFERENCE } from "@uuv/a11y";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkDirective from "remark-directive";

const plugin = () => {
    const transformer = async (ast, vfile) => {
        if (vfile.basename === "03-uuv-a11y.md") {
            const rgaaCoverageDocs = getRgaaCoverageDocs();
            const result = await unified()
                                .use(remarkParse)
                                .use(remarkDirective)
                                .parse(rgaaCoverageDocs);
            ast.children = ast.children.concat(result.children);
        }
    };
    return transformer;
};

function getRgaaCoverageDocs() {
    const rgaaCoverage = A11Y_RGAA_REFERENCE.coverage();
    const rgaaCoverageTemplate = readTemplateContent(path.join(__dirname, "rgaa-coverage.template"));
    const hbTemplate = initHandlebar(rgaaCoverageTemplate);
    return hbTemplate({
        referenceCoverage: rgaaCoverage
    });
}

function readTemplateContent(templateFile) {
    return fs.readFileSync(templateFile, {
        encoding: "utf8", flag: "r"
    });
}

function buildAdmonition(admonitionLevel, levelFormat, content) {
    return `
${levelFormat}:::${admonitionLevel}  
${levelFormat}${content}
${levelFormat}:::
${levelFormat}`;
}

function initHandlebar(rgaaCoverageTemplate) {
    Handlebars.registerHelper("coverage", function (element) {
        return `\`✔️ ${element.autoPercentage()}%\``;
    });
    Handlebars.registerHelper("manualCheck", function (element) {
        return element.manual ? `\`🖐️ ${element.manual}\`` : "";
    });
    Handlebars.registerHelper("partial", function (element) {
        return element.partial ? `\`⚠️ ${element.partial}\`` : "";
    });
    Handlebars.registerHelper("inProgress", function (element) {
        return element.inProgress ? `\`📆 ${element.inProgress}\`` : "";
    });
    Handlebars.registerHelper("wontBeImplemented", function (element) {
        return element.wontBeImplemented ? `\`❌ ${element.wontBeImplemented}\`` : "";
    });
    Handlebars.registerHelper("getLink", function (testId) {
        return A11Y_RGAA_REFERENCE.getRuleUrl(testId);
    });
    Handlebars.registerHelper("getIcon", function (test) {
        const icons= [];
        if (test.auto) {
            icons.push(`\`✔️ ${test.auto}\``);
        }
        if (test.inProgress) {
            icons.push(`\`📆\``);
        }
        if (test.partial) {
            icons.push(`\`⚠️ ${test.partial}\``);
        }
        if (test.manual) {
            icons.push(`\`🖐️ ${test.manual}\``);
        }
        if (test.wontBeImplemented) {
            icons.push(`\`❌\``);
        }
        return icons.join(" ");
    });
    Handlebars.registerHelper("comments", function (element, level = 0) {
        let levelFormat = "";
        for (let step = 0; step < level; step++) {
            levelFormat = `${levelFormat}\t`;
        }

        const commentsContent= [];
        if (element.comments.info) {
            commentsContent.push(buildAdmonition("info", levelFormat, element.comments.info));
        }
        if (element.comments.warning) {
            commentsContent.push(buildAdmonition("warning", levelFormat, element.comments.warning));
        }
        if (element.comments.danger) {
            commentsContent.push(buildAdmonition("danger", levelFormat, element.comments.danger));
        }
        return commentsContent.join("\n");
    });
    return Handlebars.compile(rgaaCoverageTemplate);
}

export default plugin;
