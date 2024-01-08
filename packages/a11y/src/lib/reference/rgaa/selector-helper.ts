 class SelectorRule {
   constructor(readonly SELECTOR: string, readonly ATTRIBUTES: string[]) {
     this.SELECTOR = SELECTOR;
     this.ATTRIBUTES = ATTRIBUTES;
   }
   buildSelectorWithAttributes() {
     const result = this.ATTRIBUTES.map(value => `${this.SELECTOR}[${value}]`);
      if (result.length === 0) {
        return [this.SELECTOR];
      }
      return result;
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
 export const siblingElement = {
  button: new SelectorRule("button", []),
  a: new SelectorRule("a[href]", []),
};
