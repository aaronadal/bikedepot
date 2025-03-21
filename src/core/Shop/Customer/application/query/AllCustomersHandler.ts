import { inject, singleton } from "tsyringe";
import { QueryHandler } from "@core/Shared/domain/bus/query/QueryHandler";
import { CustomerRepository } from "../../domain/persistence/CustomerRepository";
import { CustomerView } from "../view/CustomerView";
import { AllCustomersQuery } from "./AllCustomersQuery";

@singleton()
export class AllCustomersHandler
  implements QueryHandler<AllCustomersQuery, CustomerView[]>
{
  constructor(
    @inject("CustomerRepository") private readonly repo: CustomerRepository,
  ) {}

  supports() {
    return AllCustomersQuery;
  }

  async handle(query: AllCustomersQuery) {
    const customers = await this.repo.all(query.orderBy);

    return customers.map((customer) => CustomerView.fromCustomer(customer));
  }
}
