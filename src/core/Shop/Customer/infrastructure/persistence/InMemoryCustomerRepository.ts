import { singleton } from "tsyringe";
import { CriteriaOrder } from "../../../../Shared/domain/persistence/Criteria";
import { Customer } from "../../domain/entity/Customer";
import { CustomerId } from "../../domain/entity/CustomerId";
import { CustomerOrderByFields, CustomerRepository } from "../../domain/persistence/CustomerRepository";

@singleton()
export class InMemoryCustomerRepository implements CustomerRepository {
    private customers: Map<string, Customer>;

    constructor() {
        this.customers = new Map();
    }

    async save(customer: Customer): Promise<void> {
        this.customers.set(customer.id.value, customer);
    }

    async search(id: CustomerId): Promise<Customer | null> {
        return this.customers.get(id.value) || null;
    }

    async all(orderBy?: CriteriaOrder<CustomerOrderByFields>): Promise<Customer[]> {
        const values = [...this.customers.values()];
        if(!orderBy) {
            return values
        }

        const { field, order } = orderBy

        return values.sort((one, other) => {
            const oneValue = (order === 'asc' ? `${one[field]}` : `${other[field]}`).toLowerCase();
            const otherValue = (order === 'asc' ? `${other[field]}` : `${one[field]}`).toLowerCase();

            if (oneValue < otherValue) {
                return -1;
            }
            if (oneValue > otherValue) {
                return 1;
            }

            return 0;
        });
    }

    async delete(id: CustomerId): Promise<void> {
        this.customers.delete(id.value);
    }
}
