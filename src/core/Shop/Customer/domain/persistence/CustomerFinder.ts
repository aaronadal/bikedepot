import { EntityNotFoundError } from "@core/Shared/domain/error/EntityNotFoundError";
import { Customer } from "../entity/Customer";
import { CustomerId } from "../entity/CustomerId";
import { CustomerRepository } from "./CustomerRepository";

export class CustomerFinder {
  constructor(private readonly repo: CustomerRepository) {}

  async invoke(id: CustomerId): Promise<Customer> {
    const customer = await this.repo.search(id);
    if (!customer) {
      throw EntityNotFoundError.byTypeAndId("Customer", id.value);
    }

    return customer;
  }
}
