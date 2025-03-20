import {singleton} from "tsyringe";
import {CriteriaOrder} from "@core/Shared/domain/persistence/Criteria";
import {Customer} from "@core/Shop/Customer/domain/entity/Customer";
import {CustomerOrderByFields, CustomerRepository} from "@core/Shop/Customer/domain/persistence/CustomerRepository";
import {CustomerId} from "@core/Shop/Customer/domain/entity/CustomerId";

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
            let oneValue = order === 'asc' ? one[field].value : other[field].value;
            let otherValue = order === 'asc' ? other[field].value : one[field].value;

            if(typeof oneValue === 'string' && typeof otherValue === 'string') {
                oneValue = oneValue.toLowerCase()
                otherValue = otherValue.toLowerCase()
            }

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
