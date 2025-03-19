import { Query } from './Query';

export interface QueryHandler<Q extends Query<T>, T> {
  supports(): Query<T>;
  handle(query: Q): Promise<T>;
}
