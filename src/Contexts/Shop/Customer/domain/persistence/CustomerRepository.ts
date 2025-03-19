import { Criteria } from '../../../../Shared/domain/persistence/Criteria';
import { Customer } from '../entity/Customer';
import { CustomerId } from '../entity/CustomerId';

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;

  search(id: CustomerId): Promise<Customer | null>;

  matching(criteria: Criteria): Promise<Customer[]>;

  delete(id: CustomerId): Promise<void>;
}
