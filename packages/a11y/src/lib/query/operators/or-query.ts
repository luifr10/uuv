import { IOperatorQuery } from "./operator-query";
import { Query, QueryResult } from "../00-query";
import _ from "lodash";
const DOM_NODE_ATTRIBUTE = "domNode";

export class OrQuery implements IOperatorQuery, Query {
  constructor(readonly queries: Query[]) {}

  execute(): QueryResult[] {
    const queryResults: QueryResult[][] = this.queries.map(query => query.execute());
    return queryResults.reduce((left: QueryResult[], right: QueryResult[]) => {
      return _.unionBy(
       left,
       right,
       DOM_NODE_ATTRIBUTE
      );
    });
  }

  getSelector(): string {
    return `${this.queries.map(query => query.getSelector()).join(",")}`;
  }
}


