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
