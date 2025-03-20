import { inject, singleton } from "tsyringe";
import { QueryHandler } from "@core/Shared/domain/bus/query/QueryHandler";
import { CustomerId } from "../../domain/entity/CustomerId";
import { CustomerFinder } from "../../domain/persistence/CustomerFinder";
import { CustomerRepository } from "../../domain/persistence/CustomerRepository";
import { CustomerView } from "../view/CustomerView";
import { GetCustomerQuery } from "./GetCustomerQuery";

@singleton()
export class GetCustomerHandler implements QueryHandler<GetCustomerQuery, CustomerView> {
    private readonly finder: CustomerFinder;

    constructor(
        @inject('CustomerRepository') repo: CustomerRepository,
    ) {
        this.finder = new CustomerFinder(repo)
    }

    supports() {
        return GetCustomerQuery;
    }

    async handle(query: GetCustomerQuery) {
        const id = CustomerId.fromValue(query.id)
        const customer = await this.finder.invoke(id)

        return CustomerView.fromCustomer(customer)
    }
}
