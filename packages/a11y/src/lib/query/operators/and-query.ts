import { IOperatorQuery } from "./operator-query";
import { Query, QueryResult } from "../00-query";
import _ from "lodash";

const DOM_NODE_ATTRIBUTE = "domNode";

export class AndQuery implements IOperatorQuery, Query {
  constructor(readonly queries: Query[]) {}

  execute(): QueryResult[] {
    const queryResults: QueryResult[][] = this.queries.map(query => query.execute());
    return queryResults.reduce((left: QueryResult[], right: QueryResult[]) => {
      return _.intersectionBy(
       left,
       right,
       DOM_NODE_ATTRIBUTE
      );
    });
  }

  getSelector(): string {
    const result: QueryResult[][] = this.queries.map(query => query.execute());
    return `${_.intersection(...result).map(query => query.domNode).join(",")}`;
  }
}


