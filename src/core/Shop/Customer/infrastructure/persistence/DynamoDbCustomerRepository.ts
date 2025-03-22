import { inject, singleton } from "tsyringe";
import { CriteriaOrder } from "@core/Shared/domain/persistence/Criteria";
import { Customer } from "@core/Shop/Customer/domain/entity/Customer";
import {
  CustomerOrderByFields,
  CustomerRepository,
} from "@core/Shop/Customer/domain/persistence/CustomerRepository";
import { CustomerId } from "@core/Shop/Customer/domain/entity/CustomerId";
import { DynamoDbManager } from "@core/Shared/infrastructure/persistence/dynamodb/DynamoDbManager";
import { CustomerName } from "@core/Shop/Customer/domain/entity/CustomerName";
import { CustomerEmail } from "@core/Shop/Customer/domain/entity/CustomerEmail";
import { CustomerAddress } from "@core/Shop/Customer/domain/entity/CustomerAddress";
import { CustomerAddressAddress } from "@core/Shop/Customer/domain/entity/CustomerAddressAddress";
import { CustomerAddressCity } from "@core/Shop/Customer/domain/entity/CustomerAddressCity";
import { CustomerAddressPostalCode } from "@core/Shop/Customer/domain/entity/CustomerAddressPostalCode";
import { CustomerCredit } from "@core/Shop/Customer/domain/entity/CustomerCredit";

type DynamoCustomer = {
  const: "customers";
  id: string;
  name: string;
  email: string;
  address: {
    address: string;
    city: string;
    postalCode: string;
  };
  credit: number;
};

@singleton()
export class DynamoDbCustomerRepository implements CustomerRepository {
  constructor(
    @inject(DynamoDbManager)
    private readonly manager: DynamoDbManager<DynamoCustomer>,
    @inject("CustomersTableName") private readonly tableName: string,
  ) {}

  async save(customer: Customer): Promise<void> {
    await this.manager.save(this.tableName, customerToDynamo(customer));
  }

  async search(id: CustomerId): Promise<Customer | null> {
    const result = await this.manager.search(this.tableName, id.value);
    if (result === null) {
      return null;
    }

    return dynamoToCustomer(result);
  }

  async all(
    orderBy?: CriteriaOrder<CustomerOrderByFields>,
  ): Promise<Customer[]> {
    let index = orderBy?.field;
    if (typeof index === "string") {
      index += "-index";
    }
    const result = await this.manager.all(
      this.tableName,
      ["const", "customers"],
      index,
      orderBy?.order,
    );

    return result.map((item) => dynamoToCustomer(item));
  }

  async delete(id: CustomerId): Promise<void> {
    await this.manager.delete(this.tableName, id.value);
  }
}

function customerToDynamo(customer: Customer): DynamoCustomer {
  return {
    const: "customers",
    id: customer.id.value,
    name: customer.name.value,
    email: customer.email.value,
    address: {
      address: customer.address.address.value,
      city: customer.address.city.value,
      postalCode: customer.address.postalCode.value,
    },
    credit: customer.credit.value,
  };
}

function dynamoToCustomer(dynamo: DynamoCustomer): Customer {
  return new Customer(
    CustomerId.fromValue(dynamo.id),
    CustomerName.fromValue(dynamo.name),
    CustomerEmail.fromValue(dynamo.email),
    CustomerAddress.create(
      CustomerAddressAddress.fromValue(dynamo.address.address),
      CustomerAddressCity.fromValue(dynamo.address.city),
      CustomerAddressPostalCode.fromValue(dynamo.address.postalCode),
    ),
    CustomerCredit.fromValue(dynamo.credit),
  );
}
