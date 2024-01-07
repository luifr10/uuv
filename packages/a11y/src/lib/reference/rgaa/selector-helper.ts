 class SelectorRule {
   constructor(readonly SELECTOR: string, readonly ATTRIBUTES: string[]) {
     this.SELECTOR = SELECTOR;
     this.ATTRIBUTES = ATTRIBUTES;
   }
   buildSelectorWithAttributes() {
     return this.ATTRIBUTES.map(value => `${this.SELECTOR}[${value}]`);
   }
   buildSelectorWithoutAttributes() {
     const attributes = this.ATTRIBUTES.map(value => `:not([${value}])`);
     const emptyAttributes = this.ATTRIBUTES.map(value => `[${value}='']`);
     const selectors: string[] = [];
     selectors.push(`${this.SELECTOR}${attributes.join("")}`);
       selectors.push(`${this.SELECTOR}${emptyAttributes.join("")}`);
     return selectors.join(",");
   }
}

 export const informativeContent = {
  image: new SelectorRule("img", ["title", "aria-labelledby", "aria-label", "alt"]),
  area: new SelectorRule("area[href]", ["title", "aria-labelledby", "aria-label", "alt"]),
  input: new SelectorRule("input[type=image]", ["title", "aria-labelledby", "aria-label", "alt"]),
  object: new SelectorRule("object[type^=image]", ["title", "aria-labelledby", "aria-label"]),
  embed: new SelectorRule("embed[type^=image]", ["title", "aria-labelledby", "aria-label"]),
  svg: new SelectorRule("svg:not(a svg,button svg)", ["title", "aria-labelledby", "aria-label"]),
  canvas: new SelectorRule("canvas:not(:empty)", ["title", "aria-labelledby", "aria-label"]),
};
