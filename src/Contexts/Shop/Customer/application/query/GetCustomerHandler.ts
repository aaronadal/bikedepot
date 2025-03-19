import { Query } from "../../../../Shared/domain/bus/query/Query";
import { QueryHandler } from "../../../../Shared/domain/bus/query/QueryHandler";
import { Customer } from "../../domain/entity/Customer";
import { CustomerId } from "../../domain/entity/CustomerId";
import { CustomerFinder } from "../../domain/persistence/CustomerFinder";
import { CustomerRepository } from "../../domain/persistence/CustomerRepository";
import { CustomerView } from "../view/CustomerView";
import { GetCustomerQuery } from "./GetCustomerQuery";

export class GetCustomerHandler implements QueryHandler<GetCustomerQuery, CustomerView> {
    private readonly finder: CustomerFinder;

    constructor(
        repo: CustomerRepository,
    ) {
        this.finder = new CustomerFinder(repo)
    }

    supports(): Query<Customer> {
        return GetCustomerQuery;
    }

    async handle(query: GetCustomerQuery): Promise<CustomerView> {
        const id = CustomerId.fromValue(query.id)
        const customer = await this.finder.invoke(id)

        return CustomerView.fromCustomer(customer)
    }
}
