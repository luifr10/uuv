import { ManualCheckA11yRule } from "../../../model";
import { ByTagQuery } from "../../../query";

export default [
  ManualCheckA11yRule.from({
    criterion: "3.1",
    wcag: "1.3.1 A, 1.1.4 A",
    id: "3.1.3",
    elementType: "image",
    query: new ByTagQuery([
      "img[title]",
      "input[type=image][title]",
      "embed[title]",
      "object[type=image][title]",
      "svg[title]",
      "canvas[title]"
    ]),
    attributes: [
      "title"
    ],
    description: "information should not be a matter of colour alone",
    help: "adapt shape of image"
  }),
  ManualCheckA11yRule.from({
    criterion: "3.1",
    wcag: "1.3.1 A, 1.1.4 A",
    id: "3.1.5",
    elementType: "media",
    query: new ByTagQuery([
      "object,video,embed,svg,canvas,iframe"
    ]),
    description: "Check whether there is another way of retrieving this information (presence of a title attribute, a symbol or a graphic effect in terms of shape or position, a typographic effect, etc.).",
    help: "adapt shape of temporal media"
  }),
  ManualCheckA11yRule.from({
    criterion: "3.1",
    wcag: "1.3.1 A, 1.1.4 A",
    id: "3.1.6",
    elementType: "media",
    query: new ByTagQuery([
      "object,embed,svg,canvas,iframe"
    ]),
    description: "Check whether there is another way of retrieving this information (presence of a title attribute, a symbol or a graphic effect in terms of shape or position, a typographic effect, etc.).",
    help: "adapt shape of non temporal media"
  })
];
