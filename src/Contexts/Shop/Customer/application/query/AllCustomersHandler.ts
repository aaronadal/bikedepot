import { Query } from "../../../../Shared/domain/bus/query/Query";
import { QueryHandler } from "../../../../Shared/domain/bus/query/QueryHandler";
import { Customer } from "../../domain/entity/Customer";
import { CustomerId } from "../../domain/entity/CustomerId";
import { CustomerFinder } from "../../domain/persistence/CustomerFinder";
import { CustomerRepository } from "../../domain/persistence/CustomerRepository";
import { CustomerView } from "../view/CustomerView";
import { AllCustomersQuery } from "./AllCustomersQuery";
import { GetCustomerQuery } from "./GetCustomerQuery";

export class AllCustomersHandler implements QueryHandler<AllCustomersQuery, CustomerView[]> {
    constructor(
        private readonly repo: CustomerRepository,
    ) {
    }

    supports() {
        return AllCustomersQuery;
    }

    async handle(query: AllCustomersQuery) {
        const customers = await this.repo.all(query.orderBy)

        return customers.map((customer) => CustomerView.fromCustomer(customer))
    }
}
