import { Query } from "./00-query";
import $ from "jquery";

export class FormQuery implements Query {
    LABEL_ATTRIBUTE = "$LABEL";
    FORMFIELD_SELECTORS: string[] = [
        "input[type=text]",
        "input[type=password]",
        "input[type=search]",
        "input[type=email]",
        "input[type=number]",
        "input[type=tel]",
        "input[type=url]",
        "textarea",
        "input[type=checkbox]",
        "input[type=radio]",
        "input[type=date]",
        "input[type=range]",
        "input[type=color]",
        "input[type=time]",
        "input[type=month]",
        "input[type=week]",
        "input[type=datetime]",
        "select",
        "datalist",
        "optgroup",
        "option",
        "input[type=file]",
        "output",
        "progress",
        "meter",
        "progressbar",
        "slider",
        "spinbutton",
        "textbox",
        "listbox",
        "searchbox",
        "combobox",
        "checkbox",
        "radio",
        "switch",
        "input[type=submit]",
        "input[type=reset]",
        "input[type=hidden]",
        "input[type=image]",
        "input[type=button]",
        "button"
    ];
    FORMFIELD_LABEL_ATTRIBUTES : string[] = [
        "aria-labelledby",
        "aria-label",
        "title",
        "$LABEL"
    ];
    execute(): HTMLElement[] {
        // const foundElements = $(this.FORMFIELD_SELECTORS.join(","));
        // const elements: HTMLElement[] = [];
        // let counter = 0;
        // while (counter < foundElements.length - 1) {
        //     const element = foundElements[counter];
        //     const attributeFound = rule.attributes.filter(value => {
        //         return element.getAttribute(value);
        //     });
        //     if (attributeFound.length === 0) {
        //         if (rule.attributes.includes(CustomAttribute.LABEL.toString())) {
        //             if (!element.id) {
        //                 elements.push(element);
        //                 counter++;
        //             } else {
        //                 const foundLabelElements = jquery(`label[for=${element.id}]`);
        //                 if (foundLabelElements.length === 0) {
        //                     elements.push(element);
        //                     counter++;
        //                 }
        //             }
        //         }
        //     }
        //     counter++;
        // }
        //TODO implements filter
        return [];
    }

    getSelector(): string {
        return "FormFilter";
    }
}
