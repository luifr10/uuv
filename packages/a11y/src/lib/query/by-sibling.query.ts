import { Query, QueryResult } from "./00-query";
import _ from "lodash";
import { emulateTab } from "emulate-tab";

const DATA_TESTID = "data-testid";
const BODY = "BODY";

export class BySiblingQuery implements Query {
  constructor(
   readonly subQuery: Query,
   readonly shouldBeFound: boolean,
   readonly siblingTags: string[]) {
  }

  execute(): QueryResult[] {
    const result: QueryResult[] = [];
    this.subQuery.execute().forEach((currentElement: QueryResult) => {
      const element = currentElement.domNode;
      element.focus();
      if (document.activeElement?.tagName === BODY) {
        const ghost: HTMLElement = this.addGhostInputNode(element);
        ghost.focus();
        this.computeResult(element, result, ghost);
        ghost.remove();
      } else {
        this.computeResult(element, result);
      }
    });
    return result;
  }

  private computeResult(element: HTMLElement, result: QueryResult[], ghost: HTMLElement | undefined = undefined) {
    const elementFocused = ghost ?? element;
    const siblingElements: HTMLElement[] = [];
    emulateTab.findSelectableElements().forEach((value, index, collection) => {
      if (value.getAttribute(DATA_TESTID) === elementFocused.getAttribute(DATA_TESTID)) {
        const previousExist = index - 1 >= 0;
        const nextExist = index + 1 <= collection.length - 1;
        if (this.shouldBeFound) {
          if (previousExist && this.foundSiblingElement(collection[index - 1])) {
            siblingElements.push(collection[index - 1]);
          }
          if (nextExist && this.foundSiblingElement(collection[index + 1])) {
            siblingElements.push(collection[index + 1]);
          }
          if (!_.isEmpty(siblingElements)) {
            result.push(new QueryResult(element, siblingElements));
          }
        } else {
          if (
           (previousExist &&
            !this.foundSiblingElement(collection[index - 1]) &&
            nextExist &&
            !this.foundSiblingElement(collection[index + 1])
           )) {
            siblingElements.push(collection[index - 1]);
            siblingElements.push(collection[index + 1]);
          }
          if (
           (previousExist &&
            !this.foundSiblingElement(collection[index - 1]) &&
            !nextExist
           )
          ) {
            siblingElements.push(collection[index - 1]);
            result.push(new QueryResult(element, siblingElements));
          }
          if (
           (!previousExist &&
            nextExist &&
            !this.foundSiblingElement(collection[index + 1])
           )) {
            siblingElements.push(collection[index + 1]);
          }
          if (!_.isEmpty(siblingElements)) {
            result.push(new QueryResult(element, siblingElements));
          }
        }
      }
    });
  }

  private foundSiblingElement(element: HTMLElement): boolean {
    return this.siblingTags.includes(element.tagName.toLowerCase());
  }

  getSelector(): string {
    return `${this.subQuery.getSelector()}`;
  }

  private addGhostInputNode(element: HTMLElement): HTMLElement {
    const input = document.createElement("input");
    input.setAttribute(DATA_TESTID, "to-delete-" + String(Math.floor(Math.random() * Date.now())));
    if (element.parentNode) {
      element.parentNode.insertBefore(input, element.nextSibling);
    } else {
      element.insertBefore(input, element.nextSibling);
    }
    return input;
  }

}
