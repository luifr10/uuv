// import { A11yReference } from "../../model/reference";
// import { AutoCheckA11yRule } from "../../model/rule";
// import { ByTagQuery } from "../../query";
//
// export const A11Y_ALIX_RULES : A11yReference = {
//     name: "ALIX",
//     version: "4.1",
//     rules: [
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Attribute should not contain whitespace",
//             wcag: "",
//             id: "",
//             elementType: "error - attribute-whitespace",
//             query: new ByTagQuery([
//                 "[id*=\" \"], [lang*=\" \"], map[name*=\" \"]"
//             ]),
//             description: "Some HTML attributes should not contain any whitespace —namely [id], [lang] and map[name].",
//             help: "https://html.spec.whatwg.org/#the-id-attribute\nhttps://html.spec.whatwg.org/#the-map-element"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[tabindex] > 0",
//             wcag: "",
//             id: "",
//             elementType: "error - tab-order",
//             query: new ByTagQuery(["[tabindex]:not([tabindex=\"0\"], [tabindex^=\"-\"])"]),
//             description: "The [tabindex] attribute should never be greater than 0.",
//             help: "https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L337\nhttps://www.w3.org/WAI/WCAG21/Techniques/failures/F44\nhttps://www.scottohara.me/blog/2019/05/25/tabindex.html"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Empty [href]",
//             wcag: "",
//             id: "",
//             elementType: "error - empty-href",
//             query: new ByTagQuery(["a[href=\"\"], a[href=\" \"]"]),
//             description: "The [href] attribute, if present, should not be empty. A link to something, right?",
//             help: "https://html.spec.whatwg.org/multipage/links.html#links-created-by-a-and-area-elements\nhttps://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L161\nhttps://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L165"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Empty link",
//             wcag: "",
//             id: "",
//             elementType: "error - empty-link",
//             query: new ByTagQuery(["a:empty[title=\"\"], a:empty[aria-label=\"\"], a:empty[aria-labelledby=\"\"], a:empty:not([title], [aria-label], [aria-labelledby])"]),
//             description: "An empty link should have a label, within [title], [aria-label] or targeted by [aria-labelledby]. By the way, why would you use an empty link?",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#6.2\nhttps://www.w3.org/TR/WCAG21/#non-text-content\nhttps://www.w3.org/TR/WCAG21/#link-purpose-in-context\nhttps://www.w3.org/TR/WCAG21/#link-purpose-link-only\nhttps://www.w3.org/WAI/WCAG21/Techniques/html/H30\nhttps://www.w3.org/WAI/WCAG21/Techniques/general/G91\nhttps://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L193"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Missing alternative for img",
//             wcag: "",
//             id: "",
//             elementType: "error - no-alt",
//             query: new ByTagQuery(["img[alt=\" \"], area[alt=\" \"], input[type=\"image\"][alt=\" \"], img:not([alt]), area:not([alt]), input[type=\"image\"]:not([alt])"]),
//             description: "An <img> must have an [alt]. Always.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#1.1\nhttps://www.w3.org/WAI/tutorials/images/decision-tree/\nhttps://html.spec.whatwg.org/multipage/images.html#alt\nhttps://www.w3.org/TR/WCAG21/#non-text-content\nhttps://www.w3.org/WAI/WCAG21/Techniques/html/H36\nhttps://www.w3.org/WAI/WCAG21/Techniques/html/H37\nhttps://www.w3.org/WAI/WCAG21/Techniques/html/H24\nhttps://www.w3.org/WAI/WCAG21/Techniques/failures/F65"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Missing label for [role=img]",
//             wcag: "",
//             id: "",
//             elementType: "error - no-aria-label",
//             query: new ByTagQuery(["[role=\"img\"]:not([aria-hidden=\"true\"], [aria-label], [aria-labelledby]), svg[role=\"img\"]:not([aria-hidden=\"true\"], [aria-label], [aria-labelledby])"]),
//             description: "[role=img] without [aria-hidden=true] should either have [aria-label] or [aria-labelledby]. If image is decorative, please use [role=presentation] instead.",
//             help: "https://www.w3.org/TR/wai-aria-1.2/#img\nhttps://www.w3.org/TR/WCAG21/#non-text-content\nhttps://www.w3.org/WAI/tutorials/images/decision-tree/\nhttps://www.w3.org/wai-aria-1.2/#presentation"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Missing source for img",
//             wcag: "",
//             id: "",
//             elementType: "error - no-src",
//             query: new ByTagQuery(["img:not([src], [srcset]), img[src=\"\"], img[src=\" \"], img[src=\"#\"], img[src=\"/\"], img[srcset=\"\"], img[srcset=\" \"], img[srcset=\"#\"], img[srcset=\"/\"], input[type=\"image\"]:not([src], [srcset]), input[type=\"image\"][src=\"\"], input[type=\"image\"][src=\" \"], input[type=\"image\"][src=\"#\"], input[type=\"image\"][src=\"/\"], input[type=\"image\"][srcset=\"\"], input[type=\"image\"][srcset=\" \"], input[type=\"image\"][srcset=\"#\"], input[type=\"image\"][srcset=\"/\"]"]),
//             description: "An <img> must have an [src] or an [srcset], and it should be a valid one. Obviously.",
//             help: "https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-src\nhttps://scottjehl.github.io/picturefill/"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "A label with an empty [for] attribute",
//             wcag: "",
//             id: "",
//             elementType: "error - empty-for",
//             query: new ByTagQuery(["label[for=\"\"], label[for=\" \"]"]),
//             description: "A <label> with a [for] attribute should label something with an [id] attribute, obviously.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11.1.2\nhttps://github.com/DISIC/rgaa_referentiel_en/blob/44e2bee0c710e37ca49901b1e6b8fae9b553fd5d/criteria.html#L3981\nhttps://www.w3.org/WAI/WCAG21/Techniques/html/H44\nhttps://www.w3.org/WAI/tutorials/forms/labels/\nhttps://make.wordpress.org/accessibility/2017/01/16/testing-form-functionality-with-different-assistive-technology/\nhttps://www.w3.org/TR/WCAG21/#labels-or-instructions\nhttps://www.w3.org/TR/WCAG21/#headings-and-labels\nhttps://www.w3.org/TR/WCAG21/#info-and-relationships"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Missing some kind of label",
//             wcag: "",
//             id: "",
//             elementType: "error - no-id",
//             query: new ByTagQuery(["input:not([type=\"button\"], [type=\"submit\"], [type=\"hidden\"], [type=\"reset\"], [type=\"image\"], [id], [aria-label], [title], [aria-labelledby]), textarea:not([id], [aria-label], [aria-labelledby]), select:not([id], [aria-label], [aria-labelledby])"]),
//             description: "How to label a field? You have a few choices: [id], [title], [aria-label], and [aria-labelledby].",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11.1\nhttps://www.w3.org/TR/WCAG21/#labels-or-instructions\nhttps://www.w3.org/TR/WCAG21/#headings-and-labels\nhttps://www.w3.org/TR/WCAG21/#info-and-relationships\nhttps://www.w3.org/WAI/WCAG21/Techniques/html/H44"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Missing a value",
//             wcag: "",
//             id: "",
//             elementType: "error - no-value",
//             query: new ByTagQuery(["input[type=\"reset\"]:not([value], [title], [aria-label], [aria-labelledby]), input[type=\"submit\"]:not([value], [title], [aria-label], [aria-labelledby]), input[type=\"button\"]:not([value], [title], [aria-label], [aria-labelledby])"]),
//             description: "How to label a [reset], [submit] or [button] type input? You still have a few choices: [value], [title], [aria-label], and [aria-labelledby].",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11.9\nhttps://www.w3.org/TR/WCAG21/#name-role-value\nhttps://www.w3.org/WAI/WCAG21/Techniques/html/H91"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Empty button",
//             wcag: "",
//             id: "",
//             elementType: "error - empty-button",
//             query: new ByTagQuery(["button:empty:not([aria-label], [aria-labelledby], [title])"]),
//             description: "A <button> should either have content or an [aria-label], [aria-labelledby] or [title]. Those attributes, if present, should not be empty.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11.9\nhttps://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11\nhttps://www.w3.org/TR/WCAG21/#name-role-value\nhttps://www.w3.org/WAI/WCAG21/Techniques/html/H91\nhttps://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L193"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Empty button attribute",
//             wcag: "",
//             id: "",
//             elementType: "error - empty-button-attr",
//             query: new ByTagQuery(["button[title=\"\"], button[aria-label=\"\"], button[aria-labelledby=\"\"]"]),
//             description: "[aria-label], [aria-labelledby] or [title] on a <button> must not be empty.",
//             help: ""
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Form button",
//             wcag: "",
//             id: "",
//             elementType: "error - not-form-button",
//             query: new ByTagQuery(["button:not([type], [form], [formaction], [formtarget])"]),
//             description: "A `<button>` has a default `[type]` value of \"submit\", in order to send a `<form>`. However, outside a form, if it's intended to send a form, it should mention it with one of those attributes: `[form]`, `[formaction]`, `[formtarget]`. If it doesn't submit anything, it should have the `[type=\"button\"].",
//             help: "<https://html.spec.whatwg.org/multipage/forms.html#the-button-element>\n<https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L189>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Button not submitting",
//             wcag: "",
//             id: "",
//             elementType: "error - not-submit-button",
//             query: new ByTagQuery(["button[type=\"reset\"], button[type=\"button\"]"]),
//             description: "If a `<button>`'s `[type]` is either \"reset\" or \"button\", it should not use the following attributes: [formmethod], [formaction], [formtarget], [formenctype], [formnovalidate].",
//             help: "<https://html.spec.whatwg.org/multipage/forms.html#the-button-element>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Disabled button",
//             wcag: "",
//             id: "",
//             elementType: "error - disabled-button",
//             query: new ByTagQuery(["button[class*=\"disabled\"]:not([disabled], [readonly])"]),
//             description: "A `<button>` styled to be disabled should be disabled *for real*. Use `[disabled]` and `[readonly].",
//             help: "<https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L122>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "input without [type]",
//             wcag: "",
//             id: "",
//             elementType: "error - no-type",
//             query: new ByTagQuery(["input:not([type]), input[type=\" \"], input[type=\"\"]"]),
//             description: "`<input>` needs a `[type]` in order to tell the user what kind of data is wanted.",
//             help: "<https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11.11>\n<https://www.w3.org/TR/WCAG21/#error-suggestion>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "optgroup without label",
//             wcag: "",
//             id: "",
//             elementType: "error - optgroup",
//             query: new ByTagQuery(["optgroup:not([label])"]),
//             description: "`<optgroup>` needs a `[label]` to explain what's inside the group.",
//             help: "<https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11.8>\n<https://www.w3.org/WAI/WCAG21/Techniques/html/H85>\n<https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140916/H85>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "iframe without [title]",
//             wcag: "",
//             id: "",
//             elementType: "error - no-title",
//             query: new ByTagQuery(["iframe:not([title]), iframe[title=\" \"], iframe[title=\"\"]"]),
//             description: "`<iframe>` needs a `[title]` in order to tell the user what to expect inside the iframe.",
//             help: "<https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#2.1>\n<https://www.w3.org/TR/WCAG21/#name-role-value>\n<https://www.w3.org/WAI/WCAG21/Techniques/html/H64>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "form missing an [action]",
//             wcag: "",
//             id: "",
//             elementType: "error - no-action",
//             query: new ByTagQuery(["form:not([action]), form[action=\" \"], form[action=\"\"]"]),
//             description: "`<form>` should do something, isn't it? Well, `[action]` is meant to define what.",
//             help: "<https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L214>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "No valid language defined",
//             wcag: "",
//             id: "",
//             elementType: "error - no-lang",
//             query: new ByTagQuery(["html:not([lang]), html[lang*=\" \"], html[lang=\"\"]"]),
//             description: "`<html>` must indicate to User Agents the human language used in the document.",
//             help: "<https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.3>\n<https://accessibilite.numerique.gouv.fr/methode/glossaire/#langue-par-defaut>\n<https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.4>\n<https://www.w3.org/TR/WCAG21/#language-of-page>\n<https://www.w3.org/WAI/WCAG21/Techniques/html/H57>\n<https://html.spec.whatwg.org/#attr-lang>\n<https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang>\n<https://www.w3.org/WAI/WCAG21/Understanding/language-of-page>\n<https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts.html>\n<https://www.matuzo.at/blog/lang-attribute/>\n<https://codepen.io/matuzo/project/editor/ZyrVee>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "table used for layout",
//             wcag: "",
//             id: "",
//             elementType: "error - table-for-layout",
//             query: new ByTagQuery(["table[role=\"presentation\"] th, table[role=\"presentation\"] thead, table[role=\"presentation\"] tfoot, table[role=\"presentation\"] caption, table[role=\"presentation\"] colgroup, table[role=\"presentation\"] [axis], table[role=\"presentation\"] [scope], table[role=\"presentation\"] [headers]"]),
//             description: "`<table>` may be used for layout if a [role=\"presentation\"] is added. However, semantics tags and attributes aiming to organize data mustn't be used. Here's a list: <th>, <thead>, <tfoot>, <caption>, [axis], [scope], [headers], [colgroup].",
//             help: "<https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#5.8>\n<https://www.w3.org/WAI/WCAG21/Techniques/failures/F46>\n<https://www.w3.org/WAI/WCAG21/Techniques/failures/F49>\n<https://www.w3.org/TR/WCAG21/#info-and-relationships>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[width] & [height] attributes",
//             wcag: "",
//             id: "",
//             elementType: "error - dimensions",
//             query: new ByTagQuery([":not(img, object, embed, svg, canvas)[width], :not(img, object, embed, svg, canvas)[height]"]),
//             description: "`[width]` and `[height]` are presentation information. Therefore, they shouldn't be used in markup, except for `<img>`. Use CSS instead.",
//             help: "<https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#10>\n<https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#10.1>\n<https://www.w3.org/TR/WCAG21/#info-and-relationships>\n<https://www.w3.org/TR/WCAG21/#meaningful-sequence>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Javascript events attributes",
//             wcag: "",
//             id: "",
//             elementType: "error - js-events",
//             query: new ByTagQuery(["[onafterprint], [onbeforeprint], [onbeforeunload], [onerror], [onhaschange], [onload], [onmessage], [onoffline], [ononline], [onpagehide], [onpageshow], [onpopstate], [onredo], [onresize], [onstorage], [onundo], [onunload], [onblur], [onchage], [oncontextmenu], [onfocus], [onformchange], [onforminput], [oninput], [oninvalid], [onreset], [onselect], [onsubmit], [onkeydown], [onkeypress], [onkeyup], [onclick], [ondblclick], [ondrag], [ondragend], [ondragenter], [ondragleave], [ondragover], [ondragstart], [ondrop], [onmousedown], [onmousemove], [onmouseout], [onmouseover], [onmouseup], [onmousewheel], [onscroll], [onabort], [oncanplay], [oncanplaythrough], [ondurationchange], [onemptied], [onended], [onerror], [onloadeddata], [onloadedmetadata], [onloadstart], [onpause], [onplay], [onplaying], [onprogress], [onratechange], [onreadystatechange], [onseeked], [onseeking], [onstalled], [onsuspend], [ontimeupdate], [onvolumechange], [onwaiting]"]),
//             description: "Javascript event attributes (such as `[onmouseover]`) should not be used. Prefer either CSS pseudo-classes (`:hover`, `:focus`, `:active`, etc.) or JS event listeners.",
//             help: "<https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes>\n<https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener>"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Namespaces",
//             wcag: "",
//             id: "",
//             elementType: "error - namespace",
//             query: new ByTagQuery(["[id^='1'],[id^='2'],[id^='3'],[id^='4'],[id^='5'],[id^='6'],[id^='7'],[id^='8'],[id^='9'],[id^='0'],[id^='--'],[id^='-1'],[id^='-2'],[id^='-3'],[id^='-4'],[id^='-5'],[id^='-6'],[id^='-7'],[id^='-8'],[id^='-9'],[id^='-0'],[class^='1'],[class^='2'],[class^='3'],[class^='4'],[class^='5'],[class^='6'],[class^=''],[class^='8'],[class^='9'],[class^='0'],[class^='--'],[class^='-1'],[class^='-2'],[clas^='-3'],[class^='-4'],[class^='-5'],[class^='-6'],[class^='-7'],[class^='-8'],[class^='-9'],[class^='-0']"]),
//             description: "Did you know that some characters should be avoided as first characters in class names and identifiers? Yep. Digits, two hyphens, or hyphen followed by a digit.",
//             help: [
//                 "https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#w3cselgrammar",
//                 "https://www.w3.org/Style/CSS/Test/CSS3/Selectors/current/",
//                 "https://www.w3.org/Style/CSS/Test/CSS3/Selectors/current/html/tests/css3-modsel-175a.html"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Unaccessible viewport attribute",
//             wcag: "",
//             id: "",
//             elementType: "error - unaccessible-viewport",
//             query: new ByTagQuery(["meta[name='viewport'][content*='maximum-scale'], meta[name='viewport'][content*='minimum-scale'], meta[name='viewport'][content*='user-scalable=no']"]),
//             description: "User should be able to zoom in or out the page to improve readability and comfort; this is usually allowed by the viewport <meta>.",
//             help: [
//                 "https://bitsofco.de/linting-html-using-css/",
//                 "https://dequeuniversity.com/rules/axe/2.1/meta-viewport",
//                 "https://www.w3.org/TR/WCAG21/#resize-text"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Incorrect charset",
//             wcag: "",
//             id: "",
//             elementType: "error - incorrect-charset",
//             query: new ByTagQuery(["meta[charset]:not([charset='utf-8'], [charset='UTF-8'])"]),
//             description: "Using utf-8 character encoding is recommended by the W3C itself. Supports many languages and can accommodate pages and forms in any mixture of those languages.",
//             help: [
//                 "https://bitsofco.de/linting-html-using-css/#incorrectcharacterset",
//                 "https://html.spec.whatwg.org/multipage/semantics.html#attr-meta-charset"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Charset should come first",
//             wcag: "",
//             id: "",
//             elementType: "error - late-charset",
//             query: new ByTagQuery(["head :first-child:not([charset])"]),
//             description: "The <meta> element declaring the encoding must be inside the <head> element and within the first 1024 bytes of the HTML.",
//             help: "https://bitsofco.de/linting-html-using-css/#incorrectcharacterset"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Invalid [dir] attribute",
//             wcag: "",
//             id: "",
//             elementType: "error - invalid-dir",
//             query: new ByTagQuery(["[dir]:not([dir='rtl'], [dir='ltr'], [dir='auto'])"]),
//             description: "The [dir] attribute only accepts three values: rtl, ltr, and auto.",
//             help: [
//                 "https://www.w3.org/International/questions/qa-html-dir",
//                 "https://www.w3.org/International/articles/inline-bidi-markup/#dirattribute"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[accesskey] is a bad idea",
//             wcag: "",
//             id: "",
//             elementType: "error - accesskey",
//             query: new ByTagQuery(["[accesskey]"]),
//             description: "The [accesskey] attribute is meant to implement site-specific keyboard shortcuts. This is usually a bad idea since keys might be already used by either the operating system, the browser, browser extension, and even user's settings.",
//             help: "https://jkorpela.fi/forms/accesskey.html"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Grouping inputs",
//             wcag: "",
//             id: "",
//             elementType: "error - inputs-group",
//             query: new ByTagQuery(["input[type='radio']:not([name]), input[type='checkbox']:not(:only-of-type, [name])"]),
//             description: "Inputs with a type of radio or checkbox are usually grouped. The [name] attribute is meant to programmatically associate them, thus is needed.",
//             help: "https://www.w3.org/WAI/tutorials/forms/grouping/"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[radio] outside a fieldset",
//             wcag: "",
//             id: "",
//             elementType: "error - radio-group",
//             query: new ByTagQuery(["input[type='radio']"]),
//             description: "Inputs with a type of radio should be grouped by a parent <fieldset>, described by its <legend>.",
//             help: "https://www.w3.org/WAI/tutorials/forms/grouping/#radio-buttons"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[role=slider] missing attributes",
//             wcag: "",
//             id: "",
//             elementType: "error - role-slider",
//             query: new ByTagQuery(["[role='slider']:not([aria-valuemin]), [role='slider']:not([aria-valuemax]), [role='slider']:not([aria-valuenow])"]),
//             description: "[role='slider'] requires a few attributes: [aria-valuemin], [aria-valuemax], [aria-valuenow].",
//             help: "https://www.w3.org/TR/wai-aria-1.2/#slider"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[role=spinbutton] missing attributes",
//             wcag: "",
//             id: "",
//             elementType: "error - role-spinbutton",
//             query: new ByTagQuery(["[role='spinbutton']:not([aria-valuemin]), [role='spinbutton']:not([aria-valuemax]), [role='spinbutton']:not([aria-valuenow])"]),
//             description: "[role='spinbutton'] requires a few attributes: [aria-valuemin], [aria-valuemax], [aria-valuenow].",
//             help: "https://www.w3.org/TR/wai-aria-1.2/#spinbutton"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[role=checkbox] missing state",
//             wcag: "",
//             id: "",
//             elementType: "error - role-checkbox",
//             query: new ByTagQuery(["[role='checkbox']:not([aria-checked])"]),
//             description: "[role='checkbox'] requires an attribute: [aria-checked].",
//             help: "https://www.w3.org/TR/wai-aria-1.2/#checkbox"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[role=combobox] missing [state]",
//             wcag: "",
//             id: "",
//             elementType: "error - role-combobox",
//             query: new ByTagQuery(["[role='combobox']:not([aria-expanded])"]),
//             description: "[role='combobox'] requires an attribute: [aria-expanded].",
//             help: "https://www.w3.org/TR/wai-aria-1.2/#combobox"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[role=scrollbar] required properties",
//             wcag: "",
//             id: "",
//             elementType: "error - role-scrollbar",
//             query: new ByTagQuery(["[role='scrollbar']:not([aria-controls]), [role='scrollbar']:not([aria-valuemin]), [role='scrollbar']:not([aria-valuemax]), [role='scrollbar']:not([aria-valuenow]), [role='scrollbar']:not([aria-orientation])"]),
//             description: "Some properties are required to comply the [role='scrollbar'] pattern: [aria-controls], [aria-valuemin], [aria-valuemax], [aria-valuenow], [aria-orientation].",
//             help: "https://www.w3.org/TR/wai-aria-1.2/#scrollbar"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Nested interactive elements",
//             wcag: "",
//             id: "",
//             elementType: "error - nested-interactive",
//             query: new ByTagQuery(["a a[href], button a[href], a audio[controls], button audio[controls], a video[controls], button video[controls], a button, button button, a details, button details, a embed, button embed, a iframe, button iframe, a img[usemap], button img[usemap], a label, button label, a select, button select, a textarea, button textarea, a input[type]:not([hidden]), button input[type]:not([hidden]), form form, label label, meter meter, progress progress"]),
//             description: "An interactive element should not be contained in another interactive element (e.g. <a> in <button>).",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.2"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Invalid nesting in a list",
//             wcag: "",
//             id: "",
//             elementType: "warning - invalid-list-nesting",
//             query: new ByTagQuery(["ul > :not(li), ol > :not(li), :not(ul, ol) > li"]),
//             description: "The only child allowed in <ul> and <ol> is <li> - and the converse is also true.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.2"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Invalid sibling in a definition list",
//             wcag: "",
//             id: "",
//             elementType: "warning - invalid-def",
//             query: new ByTagQuery(["dt + :not(dd), :not(dt, dd) + dd"]),
//             description: "<dt> and <dd> should be direct adjacent siblings, and nothing else. Although multiple <dd> may follow a single <dt>.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.2"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Invalid nesting in a definition list",
//             wcag: "",
//             id: "",
//             elementType: "warning - invalid-def-nesting",
//             query: new ByTagQuery([":not(dl) > dt, :not(dl) > dd, dl > :not(dt, dd, div)"]),
//             description: "<div>, <dt> and <dd> should be direct children of <dl>. Any other imbrication may be a crime somewhere.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.2"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "figcaption outside a figure",
//             wcag: "",
//             id: "",
//             elementType: "warning - invalid-figcaption-nesting",
//             query: new ByTagQuery([":not(figure) > figcaption"]),
//             description: "<figcaption> doesn't make sense outside a <figure>.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.2"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "figure without the group ARIA role",
//             wcag: "",
//             id: "",
//             elementType: "warning - figure-role",
//             query: new ByTagQuery(["figure:not([role=\"group\"])"]),
//             description: "<figure> needs [role=\"group\"] for accessibility reason.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#1.9"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Invalid nesting",
//             wcag: "",
//             id: "",
//             elementType: "warning - invalid-nesting",
//             query: new ByTagQuery(["nav main, aside main, footer main, header main, article main, :not(tr) > td, :not(tr) > th, colgroup *:not(col), :not(colgroup) > col, tr > :not(td, th), optgroup > :not(option), :not(select) > optgroup, :not(fieldset) > legend, select > :not(option, optgroup), table > *:not(thead, tfoot, tbody, tr, colgroup, caption), address h1, address h2, address h3, address h4, address h5, address h6, address nav, address aside, address header, address footer, address address, address article, address section"]),
//             description: "Some nestings are forbidden, and do not have their own test case for now.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.2"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Misplaced div",
//             wcag: "",
//             id: "",
//             elementType: "warning - misplaced-div",
//             query: new ByTagQuery(["b div, i div, q div, em div, abbr div, cite div, code div, span div, small div, label div, strong div"]),
//             description: "Did you know that you shouldn't add a <div> inside any inline element? You could use a <span> instead.",
//             help: "https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L326"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Misused sectioning tags",
//             wcag: "",
//             id: "",
//             elementType: "warning - sectioning-tags",
//             query: new ByTagQuery(["aside > aside:first-child, article > aside:first-child, aside > article:first-child, aside > section:first-child, section > section:first-child, article > section:first-child, article > article:first-child"]),
//             description: "<section>, <aside>, <article> are sectioning tags. They must not be used as wrappers!",
//             help: "https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L252"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "legend must be a fieldset's:first-child",
//             wcag: "",
//             id: "",
//             elementType: "warning - fieldset",
//             query: new ByTagQuery(["fieldset > *:not(legend):first-child, fieldset > legend:not(:first-child)"]),
//             description: "<legend> must be the first child of a <fieldset>.",
//             help: "https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L292"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "label must wrap an interactive element",
//             wcag: "",
//             id: "",
//             elementType: "warning - label-wrap",
//             query: new ByTagQuery(["label:has(button, details, input, select, textarea, a, area, fieldset, keygen, object, output, progress, video)"]),
//             description: "<label> must wrap an interactive element.",
//             help: "https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L321"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[role=presentation] shouldn't be used on image",
//             wcag: "",
//             id: "",
//             elementType: "warning - presentation",
//             query: new ByTagQuery(["img[role=\"presentation\"], svg[role=\"presentation\"], area[role=\"presentation\"], embed[role=\"presentation\"], canvas[role=\"presentation\"], object[role=\"presentation\"]"]),
//             description: "Any decorative image should be marked up with [aria-hidden=\"true\"] (or empty [alt] if <img>). [role=presentation] shall do the trick but at the time of writing, its support is too low compared to empty [alt] or [aria-hidden=true].",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#1.2"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "A role is needed for svg",
//             wcag: "",
//             id: "",
//             elementType: "warning - no-aria-role",
//             query: new ByTagQuery(["svg:not([aria-hidden=\"true\"], [role=\"img\"])"]),
//             description: "Any <svg> should either have [aria-hidden=\"true\"] if decorative, or a [role=\"img\"] if informative.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#1.2"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[autoplay] should probably not be used",
//             wcag: "",
//             id: "",
//             elementType: "warning - autoplay",
//             query: new ByTagQuery(["video[autoplay], audio[autoplay]"]),
//             description: "A time-based media like <audio> or <video> should not [autoplay], because it can be quite surprising for the user.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#4.10"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[controls] would be helpful",
//             wcag: "",
//             id: "",
//             elementType: "warning - controls",
//             query: new ByTagQuery(["video:not([controls]), audio:not([controls])"]),
//             description: "A time-based media like <audio> or <video> would be easier to use if [controls] are activated for the user.",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#4.11"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Most of DOM nodes shouldn't be :empty",
//             wcag: "",
//             id: "",
//             elementType: "warning - empty-nodes",
//             query: new ByTagQuery(["body *:empty:not([hidden], [aria-hidden], [src], button, a, iframe, textarea, area, base, br, col, command, embed, hr, img, input, keygen, link, meta, param, source, track, wbr, title)"]),
//             description: "Obviously void elements are empty, as well as <iframe> and <textarea> could be :empty. Any other :empty tag that is not hidden is probably useless, and should be deleted.",
//             help: "https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L243"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "A single line table may be used for layout",
//             wcag: "",
//             id: "",
//             elementType: "warning - table-layout",
//             query: new ByTagQuery(["table:not([role=\"presentation\"]) > tr:only-child, table:not([role=\"presentation\"]) > tbody > tr:only-child"]),
//             description: "A lonely <tr> can be a symptom of a table used for layout. Should be double checked!",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#5.3"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Nested tables",
//             wcag: "",
//             id: "",
//             elementType: "warning - nested-table",
//             query: new ByTagQuery(["table table"]),
//             description: "Nested <table> may confuse users. Is it what you meant?",
//             help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#5.2"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Obsolete tags in HTML5",
//             wcag: "",
//             id: "",
//             elementType: "obsolete - tags obsolete",
//             query: new ByTagQuery([
//                 "applet",
//                 "acronym",
//                 "bgsound",
//                 "dir",
//                 "frame",
//                 "frameset",
//                 "noframes",
//                 "hgroup",
//                 "isindex",
//                 "listing",
//                 "nextid",
//                 "noembed",
//                 "plaintext",
//                 "rb",
//                 "rtc",
//                 "strike",
//                 "xmp",
//                 "basefont",
//                 "big",
//                 "blink",
//                 "center",
//                 "font",
//                 "marquee",
//                 "multicol",
//                 "nobr",
//                 "spacer",
//                 "tt",
//                 "keygen",
//                 "menu",
//                 "menuitem"
//             ]),
//             description: "Many, many tags are obsolete in HTML5. You should care!",
//             help: [
//                 "<https://html.spec.whatwg.org/multipage/obsolete.html#obsolete>",
//                 "<https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.2>"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Obsolete attributes in HTML5",
//             wcag: "",
//             id: "",
//             elementType: "obsolete - attributes obsolete",
//             query: new ByTagQuery([
//                 "[dropzone]",
//                 "a[charset], link[charset]",
//                 "a[coords]",
//                 "a[shape]",
//                 "a[methods], link[methods]",
//                 "a[name], embed[name], img[name], option[name]",
//                 "a[rev], link[rev]",
//                 "a[urn], link[urn]",
//                 "form[accept]",
//                 "area[nohref]",
//                 "area[type]",
//                 "area[hreflang]",
//                 "head[profile]",
//                 "html[version]",
//                 "input[ismap]",
//                 "input[usemap]",
//                 "input[inputmode]",
//                 "iframe[longdesc], img[longdesc]",
//                 "img[lowsrc]",
//                 "link[target]",
//                 "meta[scheme]",
//                 "meta[http-equiv='content-language']",
//                 "meta[http-equiv='content-type']",
//                 "meta[http-equiv='set-cookie']",
//                 "object[archive]",
//                 "object[classid]",
//                 "object[code]",
//                 "object[codebase]",
//                 "object[codetype]",
//                 "object[declare]",
//                 "object[standby]",
//                 "param[type]",
//                 "param[valuetype]",
//                 "script[language]",
//                 "script[event]",
//                 "script[for]",
//                 "table[datapagesize]",
//                 "table[summary]",
//                 "td[axis], th[axis]",
//                 "td[scope]",
//                 "td[abbr]",
//                 "a[datasrc], applet[datasrc], button[datasrc], div[datasrc], frame[datasrc], iframe[datasrc], img[datasrc], input[datasrc], label[datasrc], legend[datasrc], marquee[datasrc], object[datasrc], option[datasrc], select[datasrc], span[datasrc], table[datasrc], textarea[datasrc]",
//                 "a[datafld], applet[datafld], button[datafld], div[datafld], fieldset[datafld], frame[datafld], iframe[datafld], img[datafld], input[datafld], label[datafld], legend[datafld], marquee[datafld], object[datafld], param[datafld], select[datafld], span[datafld], textarea[datafld]",
//                 "button[dataformatas], div[dataformatas], input[dataformatas], label[dataformatas], legend[dataformatas], marquee[dataformatas], object[dataformatas], option[dataformatas], select[dataformatas], span[dataformatas], table[dataformatas]",
//                 "body[alink]",
//                 "body[bgcolor], table[bgcolor], td[bgcolor], th[bgcolor], tr[bgcolor]",
//                 "body[link]",
//                 "body[marginbottom]",
//                 "body[marginheight], iframe[marginheight]",
//                 "body[marginleft]",
//                 "body[marginright]",
//                 "body[margintop]",
//                 "body[marginwidth], iframe[marginwidth]",
//                 "body[text]",
//                 "body[vlink]",
//                 "br[clear]",
//                 "col[char], tbody[char], thead[char], tfoot[char], td[char], th[char], tr[char]",
//                 "col[charoff], tbody[charoff], thead[charoff], tfoot[charoff], td[charoff], th[charoff], tr[charoff]",
//                 "col[valign], tbody[valign], thead[valign], tfoot[valign], td[valign], th[valign], tr[valign]",
//                 "col[width], hr[width], pre[width], table[width], td[width], th[width]",
//                 "dl[compact], ol[compact], ul[compact]",
//                 "embed[hspace], iframe[hspace], input[hspace], img[hspace], object[hspace]",
//                 "embed[vspace], iframe[vspace], input[vspace], img[vspace], object[vspace]",
//                 "hr[color]",
//                 "hr[noshade]",
//                 "hr[size]",
//                 "h1[align], h2[align], h3[align], h4[align], h5[align], h6[align], iframe[align], caption[align], col[align], div[align], embed[align], hr[align], input[align], img[align], legend[align], object[align], p[align], table[align], tbody[align], thead[align], tfoot[align], td[align], th[align], tr[align]",
//                 "iframe[allowtransparency]",
//                 "iframe[frameborder]",
//                 "iframe[framespacing]",
//                 "iframe[scrolling]",
//                 "img[border], object[border]",
//                 "li[type], ul[type]",
//                 "table[cellpadding]",
//                 "table[cellspacing]",
//                 "table[frame]",
//                 "table[rules]",
//                 "td[height], th[height]",
//                 "td[nowrap], th[nowrap]",
//                 "body[background], table[background], thead[background], tbody[background], tfoot[background], tr[background], td[background], th[background]",
//                 "embed[name], img[name]",
//                 "area[nohref]",
//                 "area[type]",
//                 "area[hreflang]",
//                 "input[ismap]",
//                 "input[usemap]",
//                 "iframe[longdesc], img[longdesc]",
//                 "img[lowsrc]",
//                 "object[archive]",
//                 "object[classid]",
//                 "object[code]",
//                 "object[codebase]",
//                 "object[codetype]",
//                 "object[declare]",
//                 "object[standby]",
//                 "iframe[datasrc], img[datasrc], input[datasrc],object[datasrc], select[datasrc], textarea[datasrc]",
//                 "iframe[datafld], img[datafld], input[datafld], object[datafld], select[datafld], textarea[datafld]",
//                 "input[dataformatas], object[dataformatas], select[dataformatas]",
//                 "iframe[marginheight]",
//                 "iframe[marginwidth]",
//                 "br[clear]",
//                 "hr[width]",
//                 "embed[hspace], iframe[hspace], input[hspace], img[hspace], object[hspace]",
//                 "embed[vspace], iframe[vspace], input[vspace], img[vspace], object[vspace]",
//                 "hr[color]",
//                 "hr[noshade]",
//                 "hr[size]",
//                 "iframe[align], embed[align], hr[align], input[align], img[align], object[align]",
//                 "iframe[allowtransparency]",
//                 "iframe[frameborder]",
//                 "iframe[framespacing]",
//                 "iframe[scrolling]",
//                 "img[border], object[border]",
//                 "input[inputmode]",
//                 "link[charset], link[methods]",
//                 "link[rev], link[urn]",
//                 "link[target]",
//                 "meta[scheme]",
//                 "meta[http-equiv='content-language']",
//                 "meta[http-equiv='content-type']",
//                 "meta[http-equiv='set-cookie']",
//                 "script[language]",
//                 "script[event]",
//                 "script[for]"
//             ]),
//             description: "Many, many attributes are obsolete in HTML5. You should care!",
//             help: [
//                 "<https://html.spec.whatwg.org/multipage/obsolete.html#obsolete>",
//                 "<https://html.spec.whatwg.org/multipage/obsolete.html#non-conforming-features>",
//                 "<https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.2>",
//                 "<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta>"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Empty <select> should start with an empty <option>'s [value]",
//             wcag: "",
//             id: "",
//             elementType: "advice - empty-option-on-select",
//             query: new ByTagQuery(["select[required]:not([multiple])[size='1'], select[required]:not([multiple], [size])"]),
//             description: "A <select required> element, which isn't [multiple] and whose [size] isn't greater than 1, should start with an empty <option>. That being said, you may use a placeholder content for this option but must ensure to use an empty [value] attribute; or set a [size] attribute to the <select>, which value should equal to the number of <option>s.",
//             help: [
//                 "https://html.spec.whatwg.org/multipage/form-elements.html#placeholder-label-option",
//                 "https://validator.w3.org/nu/?showsource=yes&doc=https%3A%2F%2Fjsbin.com%2Ftozopid%2Fquiet"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Empty [class] attribute",
//             wcag: "",
//             id: "",
//             elementType: "advice - empty-class",
//             query: new ByTagQuery(["[class=''], [class=' ']"]),
//             description: "[class] shouldn't be present if empty. Something to improve, right?"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Empty [id] attribute",
//             wcag: "",
//             id: "",
//             elementType: "advice - empty-id",
//             query: new ByTagQuery(["[id=''], [id=' ']"]),
//             description: "[id] shouldn't be present if empty. You'll thank me later."
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "A second visible main tag",
//             wcag: "",
//             id: "",
//             elementType: "advice - main",
//             query: new ByTagQuery(["main ~ main:not([hidden])"]),
//             description: "A single <main> should be visible at a time. Isn't that obvious?",
//             help: "https://html.spec.whatwg.org/multipage/grouping-content.html#elementdef-main"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "A second figcaption tag",
//             wcag: "",
//             id: "",
//             elementType: "advice - figcaption",
//             query: new ByTagQuery(["figcaption:not(:first-of-type)"]),
//             description: "<figcaption> should be single inside its parent. Check the spec!",
//             help: "https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "figcaption order",
//             wcag: "",
//             id: "",
//             elementType: "advice - figcaption-order",
//             query: new ByTagQuery(["figcaption:not(:first-child, :last-child)"]),
//             description: "<figcaption> should be first or last child. Nothing else.",
//             help: "https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "An email link should be valid",
//             wcag: "",
//             id: "",
//             elementType: "advice - mailto",
//             query: new ByTagQuery(["[href^='mailto']"]),
//             description: "A <a href='mailto:'> should contain a valid email. Otherwise you may annoy your users."
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "A phone link should call a real number",
//             wcag: "",
//             id: "",
//             elementType: "advice - tel",
//             query: new ByTagQuery(["[href^='tel']"]),
//             description: "A <a href='tel:'> should contain a valid phone number. Otherwise you may make your users call anybody."
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "button [role] on a link",
//             wcag: "",
//             id: "",
//             elementType: "advice - role-button",
//             query: new ByTagQuery(["a[role='button']"]),
//             description: "Obviously, a button role on a link is probably not so hard to move to an authentic button tag, isn't it?",
//             help: "https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L174"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Link opening new tab",
//             wcag: "",
//             id: "",
//             elementType: "advice - target-blank",
//             query: new ByTagQuery(["[target$='blank']"]),
//             description: "A link opening new tab or window should warn the user about its behavior. You could use a [title], for example.",
//             help: [
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#13.2",
//                 "https://www.w3.org/TR/WCAG21/#link-purpose-in-context",
//                 "https://www.w3.org/TR/WCAG21/#change-on-request",
//                 "https://www.w3.org/WAI/WCAG21/Techniques/html/H33",
//                 "https://www.w3.org/WAI/WCAG21/Techniques/html/H83",
//                 "https://www.w3.org/WAI/WCAG21/Techniques/failures/F22"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Linking to a file",
//             wcag: "",
//             id: "",
//             elementType: "advice - file-format",
//             query: new ByTagQuery(["[download], [href$='.pdf']:not(link), [href$='.doc']:not(link), [href$='.png']:not(link), [href$='.jpg']:not(link), [href$='.gif']:not(link), [href$='.mp3']:not(link), [href$='.mp4']:not(link), [href$='.mov']:not(link), [href$='.ogg']:not(link), [href$='.xls']:not(link), [href$='.txt']:not(link), [href$='.zip']:not(link), [href$='.rar']:not(link), [href$='.docx']:not(link), [href$='.webp']:not(link), [href$='.apng']:not(link), [href$='.svg']:not(link), [href$='.svgz']:not(link)"]),
//             description: "A link to a file should indicate the file format, the file size, and if different from the main document, the file language.",
//             help: [
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#13.3",
//                 "https://www.w3.org/TR/WCAG21/#link-purpose-in-context",
//                 "https://www.w3.org/WAI/WCAG21/Techniques/html/H33"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Duplicated roles",
//             wcag: "",
//             id: "",
//             elementType: "advice - duplicate-roles",
//             query: new ByTagQuery(["[role='main'] ~ [role='main'], [role='search'] ~ [role='search'], [role='banner'] ~ [role='banner'], [role='contentinfo'] ~ [role='contentinfo']"]),
//             description: "Some ARIA roles should be unique: at least [main], [search], [banner], [contentinfo].",
//             help: [
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#12.6",
//                 "https://www.w3.org/TR/WCAG21/#bypass-blocks"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "May have a search [role]?",
//             wcag: "",
//             id: "",
//             elementType: "advice - missing-role",
//             query: new ByTagQuery(["[id*='search']:not([role='search']), [class*='search']:not([role='search'])"]),
//             description: "A [class] or [id] containing 'search' may carry the search ARIA [role].",
//             help: [
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#12.6",
//                 "https://www.w3.org/TR/WCAG21/#bypass-blocks"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Does this look like [required]?",
//             wcag: "",
//             id: "",
//             elementType: "advice - required",
//             query: new ByTagQuery(["[required], [aria-required]"]),
//             description: "[required] or [aria-required] should be visually understandable.",
//             help: [
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#11.10",
//                 "https://www.w3.org/TR/WCAG21/#labels-or-instructions"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Not :empty [hidden] things",
//             wcag: "",
//             id: "",
//             elementType: "advice - hidden",
//             query: new ByTagQuery(["[hidden]:not(:empty), [aria-hidden='true']:not(:empty)"]),
//             description: "[hidden] or [aria-hidden] may not be a good idea if hiding content.",
//             help: [
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#10.8",
//                 "https://www.w3.org/TR/WCAG21/#name-role-value"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Placeholder can't replace a label",
//             wcag: "",
//             id: "",
//             elementType: "advice - placeholder",
//             query: new ByTagQuery(["[placeholder]:not([title], [aria-label], [aria-labelledby])"]),
//             description: "[placeholder] is not a label, is it?"
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "video or audio things",
//             wcag: "",
//             id: "",
//             elementType: "advice - video-audio",
//             query: new ByTagQuery(["video, audio"]),
//             description: "A <video> or <audio> needs a few things to be accessible, like a transcript, subtitles, controls. This kind of things.",
//             help: [
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#4.1",
//                 "https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded",
//                 "https://www.w3.org/TR/WCAG21/#audio-description-or-media-alternative-prerecorded",
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#4.13",
//                 "https://www.w3.org/TR/WCAG21/#media-alternative-prerecorded"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[title] should be equal to alternative",
//             wcag: "",
//             id: "",
//             elementType: "advice - title",
//             query: new ByTagQuery(["img[alt][title], area[alt][title], svg[aria-label][title]"]),
//             description: "A [title] on any graphic content should be equal to [aria-label] or [alt].",
//             help: [
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#1.3",
//                 "https://www.w3.org/TR/WCAG21/#non-text-content",
//                 "https://www.w3.org/WAI/tutorials/images/decision-tree/",
//                 "https://html.spec.whatwg.org/multipage/images.html#alt"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Date and time should be understandable",
//             wcag: "",
//             id: "",
//             elementType: "advice - time",
//             query: new ByTagQuery(["time, [datetime]"]),
//             description: "A <time> or [datetime] content should be an understandable and well-formatted date.",
//             help: []
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "[scope] should be either col or row",
//             wcag: "",
//             id: "",
//             elementType: "advice - th-scope",
//             query: new ByTagQuery(["th[scope]"]),
//             description: "A [scope] can be col or row (and nothing else) and it has to be relevant.",
//             help: [
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#5.7",
//                 "https://www.w3.org/TR/WCAG21/#info-and-relationships",
//                 "https://www.w3.org/WAI/WCAG21/Techniques/html/H63"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Layout table in use",
//             wcag: "",
//             id: "",
//             elementType: "advice - table-presentation",
//             query: new ByTagQuery(["table[role='presentation']"]),
//             description: "A [role='presentation'] is a good idea for any <table> used for layout, but a bad thing for a data table. Double-check this!",
//             help: [
//                 "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#5.3",
//                 "https://www.w3.org/TR/WCAG21/#meaningful-sequence"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "No [href]",
//             wcag: "",
//             id: "",
//             elementType: "advice - no-href",
//             query: new ByTagQuery(["a:not([href])"]),
//             description: "Yet it's valid to skip the [href] attribute on a link, it's probably better to double-check, isn't it?",
//             help: [
//                 "https://html.spec.whatwg.org/multipage/links.html#links-created-by-a-and-area-elements",
//                 "https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L161",
//                 "https://github.com/Heydon/REVENGE.CSS/blob/master/revenge.css#L165"
//             ]
//         }),
//         AutoCheckA11yRule.from({
//             reference: "a11y.css",
//             criterion: "Non HTTPS URL",
//             wcag: "",
//             id: "",
//             elementType: "advice - no-https",
//             query: new ByTagQuery(["[src^='http:'], [href^='http:']"]),
//             description: "When possible, try to use HTTPS.",
//             help: [
//                 "https://transparencyreport.google.com/https/overview?hl=en",
//                 "https://letsencrypt.org/",
//                 "https://checklists.opquast.com/fr/assurance-qualite-web/les-echanges-de-donnees-sensibles-sont-securises-et-signales-comme-tels"
//             ]
//         })
//     ]
// };
