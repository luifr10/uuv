import { OrQuery } from "./or-query";
import { Query } from "../00-query";
import { AndQuery } from "./and-query";

export interface IOperatorQuery {
  queries: Query[];
}

export class OperatorQuery {
  public static Or = (...queries: Query[]): Query => {
    return new OrQuery(queries);
  };
  public static And = (...queries: Query[]): Query => {
    return new AndQuery(queries);
  };
}


