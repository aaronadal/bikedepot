import { Query } from './Query';

export interface CommandHandler<T, Q extends Query<T>> {
  supports(): Query<T>;
  handle(query: Q): Promise<T>;
}
