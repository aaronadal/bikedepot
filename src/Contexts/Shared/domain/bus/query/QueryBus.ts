import { Query } from './Query';

export interface QueryBus {
  ask<T, Q extends Query<T>>(query: Q): Promise<T>;
}
