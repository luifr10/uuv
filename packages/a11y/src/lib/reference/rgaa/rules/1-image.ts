import { AutoCheckA11yRule, ManualCheckA11yRule } from "../../../model";
import {
  AccessibleNameQuery, AttributeChecker,
  ByRoleQuery,
  ByTagQuery,
  CompliantAttributesQuery, OperatorQuery
} from "../../../query";
import { informativeContent, siblingElement } from "../selector-helper";
import { BySiblingQuery } from "../../../query/by-sibling.query";

export default [
  AutoCheckA11yRule.from({
    criterion: "1.1",
    wcag: "1.1.1 A",
    id: "1.1.1",
    elementType: "image",
    query: new AccessibleNameQuery(
        new ByTagQuery([
          informativeContent.image.SELECTOR
        ]),
        true
    ),
    description: "image has no text information",
    help: "set text information to image"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.1",
    wcag: "1.1.1 A",
    id: "1.1.1",
    elementType: "image",
    query: new AccessibleNameQuery(
        new ByRoleQuery(
            "img",
            [],
            ["object", "svg", "embed", "canvas"]
        ),
        true
    ),
    description: "image has no text information",
    help: "set text information to image"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.1",
    wcag: "1.1.1 A",
    id: "1.1.2",
    elementType: "area",
    query: new AccessibleNameQuery(
        new ByTagQuery([
          informativeContent.area.SELECTOR
        ]),
        true
    ),
    description: "area has no alternative text",
    help: "set alternative text to area"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.1",
    wcag: "1.1.1 A",
    id: "1.1.3",
    elementType: "input",
    query: new CompliantAttributesQuery(
        new ByTagQuery([
          informativeContent.input.SELECTOR
        ]),
        [
          AttributeChecker.emptyAttribute("alt"),
          AttributeChecker.emptyAttribute("aria-label"),
          AttributeChecker.emptyAttribute("title"),
          AttributeChecker.emptyHtmlNodeTargetedByTheAttribute("aria-labelledBy")
        ]
    ),
    description: "input with image type has no alternative text",
    help: "set alternative text to input with image type"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.1",
    wcag: "1.1.1 A",
    id: "1.1.4",
    elementType: "image",
    query: new ByTagQuery([
      "a[href]img[ismap]"
    ]),
    description: "The clickable zone does not have an identical mechanism, which can be used regardless of the pointing device used and provides access to the same destination",
    help: "provide a mechanism identical to the clickable zone, which can be used regardless of the pointing device used and provides access to the same destination"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.1",
    wcag: "1.1.1 A",
    id: "1.1.5",
    elementType: "svg",
    query: new AccessibleNameQuery(
        new ByTagQuery([
          informativeContent.svg.SELECTOR
        ]),
        true
    ),
    description: "svg has no alternative text",
    help: "set alternative text to svg"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.1",
    wcag: "1.1.1 A",
    id: "1.1.5",
    elementType: "svg",
    query: new ByTagQuery([
      "svg:not([role=img])"
    ]),
    description: "svg has no image role",
    help: "set image role to svg"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.1",
    wcag: "1.1.1 A",
    id: "1.1.6",
    elementType: "object",
    query: new ByTagQuery(
     [`${informativeContent.object.SELECTOR}:not([role=img])`]
    ),
    description: "object has no role image",
    help: "add role image"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.1",
    wcag: "1.1.1 A",
    id: "1.1.6",
    elementType: "object",
    query: OperatorQuery.And(
     new AccessibleNameQuery(
      new ByTagQuery([`${informativeContent.object.SELECTOR}[role=img]`]),
      true
     ),
     new BySiblingQuery(
      new ByTagQuery([`${informativeContent.object.SELECTOR}[role=img]`]),
      false,
      [siblingElement.button.SELECTOR, "a"]
     )
    ),
    description: "object has no alternative text",
    help: "domNode corresponds to the object node and linkedNodes corresponds to the nodes to be analysed"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.1",
    wcag: "1.1.1 A",
    id: "1.1.6",
    elementType: "object",
    query: OperatorQuery.And(
     new AccessibleNameQuery(
      new ByTagQuery([`${informativeContent.object.SELECTOR}[role=img]`]),
      true
     ),
     new BySiblingQuery(
      new ByTagQuery([`${informativeContent.object.SELECTOR}[role=img]`]),
      true,
      [siblingElement.button.SELECTOR, "a"]
     )
    ),
    description: "object has sibling elements to check",
    help: "domNode corresponds to the object node and linkedNodes corresponds to the nodes to be analysed"
  }),
  // AutoCheckA11yRule.from({
  //         //     criterion: "1.1",
  //     wcag: "1.1.1 A",
  //     id: "1.1.7",
  //     elementType: "embed",
  //     query: new AccessibleNameQuery(new ByTagQuery([
  //         informativeContent.embed.SELECTOR
  //     ]), true),
  //     description: "embed has no image role or no alternative text",
  //     help: "set image role to embed and alternative text"
  // }),
  // AutoCheckA11yRule.from({
  //         //     criterion: "1.1",
  //     wcag: "1.1.1 A",
  //     id: "1.1.8",
  //     elementType: "canvas",
  //     query: new AccessibleNameQuery(new ByTagQuery([
  //         "canvas[role=img]"
  //     ]), true),
  //     description: "canvas has no image role and no alternative text",
  //     help: "set image role to canvas and alternative text"
  // }),
  AutoCheckA11yRule.from({
    criterion: "1.2",
    wcag: "1.1.1 A, 4.1.2 A",
    id: "1.2.1",
    elementType: "image",
    query: new AccessibleNameQuery(
        new ByTagQuery([
          "img[alt='']:not([href])",
          "img[aria-hidden=true]:not([href]",
          "img[role=presentation]:not([href])"
        ]),
        false
    ),
    description: "decorative image has alternative text",
    help: "remove alternative text to decorative image"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.2",
    wcag: "1.1.1 A, 4.1.2 A",
    id: "1.2.2",
    elementType: "area",
    query: new AccessibleNameQuery(
        new ByTagQuery([
          "area[alt='']:not([href])",
          "area[aria-hidden=true]:not([href]",
          "area[role=presentation]:not([href])"
        ]),
        false
    ),
    description: "decorative area has alternative text",
    help: "remove alternative text to decorative area"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.2",
    wcag: "1.1.1 A, 4.1.2 A",
    id: "1.2.3",
    elementType: "object",
    query: new AccessibleNameQuery(
        new ByTagQuery([
          "object[aria-hidden=true]"
        ]),
        false
    ),
    description: "decorative object has alternative text",
    help: "remove alternative text to decorative object"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.2",
    wcag: "1.1.1 A, 4.1.2 A",
    id: "1.2.4",
    elementType: "svg",
    query: new AccessibleNameQuery(
        new ByTagQuery([
          "svg[aria-hidden=true][title]:not([title=''])",
          "svg[aria-hidden=true][desc]:not([desc=''])"
        ]),
        false
    ),
    description: "decorative svg has alternative text",
    help: "remove alternative text to decorative svg"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.2",
    wcag: "1.1.1 A, 4.1.2 A",
    id: "1.2.5",
    elementType: "canvas",
    query: new AccessibleNameQuery(
        new ByTagQuery([
          "canvas[aria-hidden=true]"
        ]),
        false
    ),
    description: "decorative canvas has alternative text",
    help: "remove alternative text to decorative canvas"
  }),
  AutoCheckA11yRule.from({
    criterion: "1.2",
    wcag: "1.1.1 A, 4.1.2 A",
    id: "1.2.6",
    elementType: "embed",
    query: new AccessibleNameQuery(
        new ByTagQuery([
          "embed[aria-hidden=true]"
        ]),
        false
    ),
    description: "decorative embed has alternative text",
    help: "remove alternative text to decorative embed"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.3",
    wcag: "4.1.2 A",
    id: "1.3.1",
    elementType: "image",
    query: new ByTagQuery(informativeContent.image.buildSelectorWithAttributes()),
    attributes: informativeContent.image.ATTRIBUTES,
    description: "if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.3",
    wcag: "4.1.2 A",
    id: "1.3.1",
    elementType: "image",
    query: new ByRoleQuery("img", informativeContent.image.ATTRIBUTES),
    attributes: informativeContent.image.ATTRIBUTES,
    description: "if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.3",
    wcag: "4.1.2 A",
    id: "1.3.2",
    elementType: "area",
    query: new ByTagQuery(informativeContent.area.buildSelectorWithAttributes()),
    attributes: informativeContent.area.ATTRIBUTES,
    description: "if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.3",
    wcag: "4.1.2 A",
    id: "1.3.3",
    elementType: "input",
    query: new ByTagQuery(informativeContent.input.buildSelectorWithAttributes()),
    attributes: informativeContent.input.ATTRIBUTES,
    description: "if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.3",
    wcag: "4.1.2 A",
    id: "1.3.4",
    elementType: "object",
    query: new ByTagQuery(informativeContent.object.buildSelectorWithAttributes()),
    attributes: informativeContent.object.ATTRIBUTES,
    description: "if present, attributes title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.3",
    wcag: "4.1.2 A",
    id: "1.3.5",
    elementType: "embed",
    query: new ByTagQuery(informativeContent.embed.buildSelectorWithAttributes()),
    attributes: informativeContent.embed.ATTRIBUTES,
    description: "if present, attributes title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.3",
    wcag: "4.1.2 A",
    id: "1.3.6",
    elementType: "svg",
    query: new ByTagQuery(informativeContent.svg.buildSelectorWithAttributes()),
    attributes: informativeContent.svg.ATTRIBUTES,
    description: "if present, attributes title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.3",
    wcag: "4.1.2 A",
    id: "1.3.7",
    elementType: "canvas",
    query: new ByTagQuery(informativeContent.canvas.buildSelectorWithAttributes()),
    attributes: informativeContent.canvas.ATTRIBUTES,
    description: "if present, attributes title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.3",
    wcag: "4.1.2 A",
    id: "1.3.9",
    elementType: "polymorph",
    query: new ByTagQuery([
      ...informativeContent.image.buildSelectorWithAttributes(),
      ...informativeContent.area.buildSelectorWithAttributes(),
      ...informativeContent.input.buildSelectorWithAttributes()
    ]),
    attributes: [
      "title",
      "aria-labelledby",
      "aria-label",
      "alt"
    ],
    description: "if present, attributes alt, title, aria-label, aria-labelledby must contain short and concise information",
    help: "adapt these attributes to be short and concise"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.3",
    wcag: "4.1.2 A",
    id: "1.3.9",
    elementType: "polymorph",
    query: new ByTagQuery([
      ...informativeContent.object.buildSelectorWithAttributes(),
      ...informativeContent.embed.buildSelectorWithAttributes(),
      ...informativeContent.svg.buildSelectorWithAttributes(),
      ...informativeContent.canvas.buildSelectorWithAttributes()
    ]),
    attributes: [
      "title",
      "aria-labelledby",
      "aria-label"
    ],
    description: "if present, attributes title, aria-label, aria-labelledby must contain short and concise information",
    help: "adapt these attributes to be short and concise"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.4",
    wcag: "1.1.1 A",
    id: "1.4.1",
    elementType: "image",
    query: new ByTagQuery(informativeContent.image.buildSelectorWithAttributes()),
    attributes: informativeContent.image.ATTRIBUTES,
    description: "For captcha or image-test, if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.4",
    wcag: "1.1.1 A",
    id: "1.4.2",
    elementType: "area",
    query: new ByTagQuery(informativeContent.area.buildSelectorWithAttributes()),
    attributes: informativeContent.area.ATTRIBUTES,
    description: "For captcha or image-test, if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.4",
    wcag: "1.1.1 A",
    id: "1.4.3",
    elementType: "input",
    query: new ByTagQuery(informativeContent.input.buildSelectorWithAttributes()),
    attributes: informativeContent.input.ATTRIBUTES,
    description: "For captcha or image-test, if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.4",
    wcag: "1.1.1 A",
    id: "1.4.4",
    elementType: "object",
    query: new ByTagQuery(informativeContent.object.buildSelectorWithAttributes()),
    attributes: informativeContent.object.ATTRIBUTES,
    description: "For captcha or image-test, if present, attributes, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.4",
    wcag: "1.1.1 A",
    id: "1.4.5",
    elementType: "embed",
    query: new ByTagQuery(informativeContent.embed.buildSelectorWithAttributes()),
    attributes: informativeContent.embed.ATTRIBUTES,
    description: "For captcha or image-test, if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.4",
    wcag: "1.1.1 A",
    id: "1.4.6",
    elementType: "svg",
    query: new ByTagQuery(informativeContent.svg.buildSelectorWithAttributes()),
    attributes: informativeContent.svg.ATTRIBUTES,
    description: "For captcha or image-test, if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.4",
    wcag: "1.1.1 A",
    id: "1.4.7",
    elementType: "canvas",
    query: new ByTagQuery(informativeContent.canvas.buildSelectorWithAttributes()),
    attributes: informativeContent.canvas.ATTRIBUTES,
    description: "For captcha or image-test, if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
    help: "adapt these attributes to be relevant"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.5",
    wcag: "1.1.1 A",
    id: "1.5.1",
    elementType: "polymorph",
    query: new ByTagQuery([
      "img",
      "area",
      "object",
      "embed",
      "svg",
      "canvas"
    ]),
    description: "There is an alternative access solution to the content or function of the CAPTCHA",
    help: "Add an alternative access solution"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.5",
    wcag: "1.1.1 A",
    id: "1.5.1",
    elementType: "image",
    query: new ByRoleQuery("img"),
    description: "There is an alternative access solution to the content or function of the CAPTCHA",
    help: "Add an alternative access solution"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.5",
    wcag: "1.1.1 A",
    id: "1.5.2",
    elementType: "input",
    query: new ByTagQuery([
      informativeContent.input.SELECTOR
    ]),
    description: "There is an alternative access solution to the content or function of the CAPTCHA",
    help: "Add an alternative access solution"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.1",
    elementType: "image",
    query: new ByTagQuery([
      `${informativeContent.image.SELECTOR}[longdesc]`
    ]),
    attributes: [
      "longdesc"
    ],
    description: "the description must be relevant",
    help: "adapt the description"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.1",
    elementType: "image",
    query: new ByRoleQuery(
        "img",
        [
          "longdesc"
        ]
    ),
    attributes: [
      "longdesc"
    ],
    description: "the description must be relevant",
    help: "adapt the description"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.2",
    elementType: "object",
    query: new ByTagQuery([
      `${informativeContent.object.SELECTOR}[longdesc]`
    ]),
    attributes: [
      "longdesc"
    ],
    description: "the description must be relevant",
    help: "adapt the description"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.3",
    elementType: "embed",
    query: new ByTagQuery([
      `${informativeContent.embed.SELECTOR}[longdesc]`
    ]),
    attributes: [
      "longdesc"
    ],
    description: "the description must be relevant",
    help: "adapt the description"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.4",
    elementType: "input",
    query: new ByTagQuery([
      `${informativeContent.input.SELECTOR}[longdesc]`
    ]),
    attributes: [
      "aria-describedby"
    ],
    description: "the description must be relevant",
    help: "adapt the description"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.5",
    elementType: "svg",
    query: new ByTagQuery([
      `${informativeContent.svg.SELECTOR}[aria-describedby]`,
      `${informativeContent.svg.SELECTOR}[aria-labelledby]`
    ]),
    attributes: [
      "aria-describedby",
      "aria-labelledby"
    ],
    description: "the description must be relevant",
    help: "adapt the description"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.6",
    elementType: "svg",
    query: new ByTagQuery([
      `${informativeContent.svg.SELECTOR}[aria-describedby]`,
      `${informativeContent.svg.SELECTOR}[aria-labelledby]`,
      `${informativeContent.svg.SELECTOR}[aria-label]`
    ]),
    attributes: [
      "aria-describedby",
      "aria-labelledby",
      "aria-label"
    ],
    description: "if description in attribute, the description must be correctly rendered by assistive technologies",
    help: "render description by assistive technologies"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.7",
    elementType: "svg",
    query: new ByTagQuery([
      `${informativeContent.svg.SELECTOR}[aria-labelledby]`
    ]),
    attributes: [
      "aria-labelledby"
    ],
    description: "the description must be relevant",
    help: "adapt the description"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.8",
    elementType: "canvas",
    query: new ByTagQuery([
      `${informativeContent.canvas.SELECTOR}[aria-describedby]`,
      `${informativeContent.canvas.SELECTOR}[aria-labelledby]`,
      `${informativeContent.canvas.SELECTOR}[aria-label]`
    ]),
    attributes: [
      "aria-describedby",
      "aria-labelledby",
      "aria-label"
    ],
    description: "if description in attribute, the description must be correctly rendered by assistive technologies",
    help: "render description by assistive technologies"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.9",
    elementType: "polymorph",
    query: new ByTagQuery([
      "img[alt][aria-describedby]",
      "input[type^=image][aria-describedby]",
      "area[alt][aria-describedby]",
      "object[type^=image][aria-describedby]",
      "embed[type^=image][aria-describedby]",
      "svg[aria-describedby]",
      "canvas[aria-describedby]"
    ]),
    attributes: [
      "aria-describedby"
    ],
    description: "does the WAI-ARIA attribute aria-describedby associate with the detailed description?",
    help: "adapt the description"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.9",
    elementType: "polymorph",
    query: new ByRoleQuery(
        "img",
        [
          "alt",
          "aria-describedby"
        ]
    ),
    attributes: [
      "aria-describedby"
    ],
    description: "does the WAI-ARIA attribute aria-describedby associate with the detailed description?",
    help: "adapt the description"
  }),
  ManualCheckA11yRule.from({
    criterion: "1.6",
    wcag: "1.1.1 A",
    id: "1.6.10",
    elementType: "polymorph",
    query: new ByRoleQuery(
        "img",
        [
          "alt",
          "aria-describedby"
        ]
    ),
    attributes: [
      "aria-describedby"
    ],
    description: "does the WAI-ARIA attribute aria-describedby associate with the detailed description?",
    help: "adapt the description"
  })
];
