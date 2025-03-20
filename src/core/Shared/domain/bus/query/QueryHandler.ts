import { Query } from './Query';

export interface QueryHandler<Q extends Query<T>, T> {
  supports(): Function;
  handle(query: Q): Promise<T>;
}
