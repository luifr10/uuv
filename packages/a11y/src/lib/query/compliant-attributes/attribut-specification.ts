import _ from "lodash";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const $ = require("jquery/dist/jquery.min");

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
