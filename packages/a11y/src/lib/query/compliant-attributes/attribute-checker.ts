import {
  EmptyAttributeSpecification,
  EmptyElementWithIdSpecification, IAttributeSpecification, NotEmptyAttributeSpecification
} from "./attribut-specification";

export class CompliantSpecification {
  constructor(readonly attribute: string, public specification: IAttributeSpecification) {}
}

export class AttributeChecker {
  /**
   * Check if the value of the attributeName is empty
   * @param attributeName : HTMLElement attributeName
   */
  static emptyAttribute(attributeName: string) {
    return new CompliantSpecification(
        attributeName,
        new EmptyAttributeSpecification()
    );
  }

  /**
   * Check if the value of the attributeName is not empty
   * @param attributeName : HTMLElement attributeName
   */
  static notEmptyAttribute(attributeName: string) {
    return new CompliantSpecification(
     attributeName,
     new NotEmptyAttributeSpecification()
    );
  }
  /**
   * Check that the text of the HTMLElement whose id matches the value of the attribute named attributeName another HTMLElement is empty
   * @param attributeName : HTMLElement attribute name
   */
  static emptyHtmlNodeTargetedByTheAttribute(attributeName: string) {
    return new CompliantSpecification(
     attributeName,
     new EmptyElementWithIdSpecification()
    );
  }
}

