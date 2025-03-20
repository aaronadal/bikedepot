import { CriteriaOrder } from '../../../../Shared/domain/persistence/Criteria';
import { Customer } from '../entity/Customer';
import { CustomerId } from '../entity/CustomerId';

export type CustomerOrderByFields = 'name'|'credit'

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;

  search(id: CustomerId): Promise<Customer | null>;

  all(orderBy?: CriteriaOrder<CustomerOrderByFields>): Promise<Customer[]>;

  delete(id: CustomerId): Promise<void>;
}
