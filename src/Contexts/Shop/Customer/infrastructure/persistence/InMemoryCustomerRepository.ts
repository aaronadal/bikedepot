import { Criteria } from "../../../../Shared/domain/persistence/Criteria";
import { Customer } from "../../domain/entity/Customer";
import { CustomerId } from "../../domain/entity/CustomerId";
import { CustomerRepository } from "../../domain/persistence/CustomerRepository";

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

    async matching(criteria: Criteria): Promise<Customer[]> {
        if(criteria.filters.length > 0 || criteria.orders.length > 0) {
            throw new Error("Criteria not suported by now.");
        }

        return [...this.customers.values()];
    }

    async delete(id: CustomerId): Promise<void> {
        this.customers.delete(id.value);
    }
}
