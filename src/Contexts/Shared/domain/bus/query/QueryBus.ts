import { Query } from './Query';

export interface QueryBus {
  ask<Q extends Query<T>>(query: Q): Promise<T>;
}
