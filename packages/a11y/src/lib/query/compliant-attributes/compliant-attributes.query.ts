import { Query, QueryResult } from "../00-query";


import { CompliantSpecification } from "./attribute-checker";
export class CompliantAttributesQuery implements Query {
    constructor(
        readonly subQuery: Query,
        readonly attributeSpecifications: CompliantSpecification[]
    ) {
    }

    execute(): QueryResult[] {
        return this.subQuery.execute().filter((element) => {
            let result = true;
            this.attributeSpecifications.forEach(attributeSpecification => {
                result = result && attributeSpecification.specification.isSatisfiedBy(element.domNode, attributeSpecification.attribute);
            });
            return result;
        });
    }

    getSelector(): string {
        return `CompliantAttributes: ${this.subQuery.getSelector()}`;
    }
}
