import _ from "lodash";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const $ = require("jquery/dist/jquery.min");
import { computeAccessibleName } from "dom-accessibility-api";

export interface IAttributeSpecification {
  isSatisfiedBy(element: HTMLElement, attributeName: string): boolean;
}

export class EmptyAttributeSpecification implements IAttributeSpecification {
  isSatisfiedBy(element: HTMLElement, attributeName: string): boolean {
    const attributeValue = element.getAttribute(attributeName);
    return _.isEmpty(attributeValue);
  }
}

export class NotEmptyAttributeSpecification implements IAttributeSpecification {
  isSatisfiedBy(element: HTMLElement, attributeName: string): boolean {
    const attributeValue = element.getAttribute(attributeName);
    return !_.isEmpty(attributeValue);
  }
}

export class EmptyElementWithIdSpecification implements IAttributeSpecification {
  isSatisfiedBy(element: HTMLElement, attributeName: string): boolean {
    const attributeValue = element.getAttribute(attributeName);
    if (_.isEmpty(attributeValue) || _.isNull(attributeValue)) {
      return true;
    }
    const bindingNodeId = $(`#${attributeValue.replaceAll(".", "\\.")}`).text();
    return _.isEmpty(bindingNodeId);
  }
}

export class NotUniqueIdAttributeSpecification implements IAttributeSpecification {
  isSatisfiedBy(element: HTMLElement, attributeName: string): boolean {
    if (_.isNull(element.id) || _.isEmpty(element.id)) {
      return true;
    }
    return $(`[id=${element.id}]`).length > 1;
  }
}

export class NotEqualsAttributeSpecification implements IAttributeSpecification {
  constructor(private expectedValueList: string[]) {
  }

  isSatisfiedBy(element: HTMLElement, attributeName: string): boolean {
    const attributeValue = element.getAttribute(attributeName);
    if (_.isNull(attributeValue)) {
      return true;
    }
    return !this.expectedValueList.includes(attributeValue);
  }
}

export class EqualsAttributeSpecification implements IAttributeSpecification {
  constructor(private expectedValueList: string[]) {
  }

  isSatisfiedBy(element: HTMLElement, attributeName: string): boolean {
    const attributeValue = element.getAttribute(attributeName);
    if (_.isNull(attributeValue)) {
      return false;
    }
    return this.expectedValueList.includes(attributeValue);
  }
}

export class AccessibleNameNotContainsVisibleTextSpecification implements IAttributeSpecification {
  isSatisfiedBy(element: HTMLElement, attributeName: string): boolean {
    const visibleText = element.textContent;
    if (_.isNull(visibleText) || _.isEmpty(visibleText)) {
      return false;
    }
    const accessibleName = computeAccessibleName(element);
    console.debug("visibleText", visibleText, "accessibleName", accessibleName);
    return accessibleName?.toLowerCase().indexOf(visibleText.toLowerCase()) === -1;
  }
}

export class EmptyInnerTextSpecification implements IAttributeSpecification {
  isSatisfiedBy(element: HTMLElement, attributeName: string): boolean {
    return _.isEmpty(element.textContent);
  }
}

export class NotEmptyInnerTextSpecification implements IAttributeSpecification {
  isSatisfiedBy(element: HTMLElement, attributeName: string): boolean {
    return !_.isEmpty(element.textContent);
  }
}
