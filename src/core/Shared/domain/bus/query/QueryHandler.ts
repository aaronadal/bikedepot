import { Query } from "./Query";

export interface QueryHandler<Q extends Query<T>, T> {
  supports(): new (...args: any[]) => Query<Q>;
  handle(query: Q): Promise<T>;
}
