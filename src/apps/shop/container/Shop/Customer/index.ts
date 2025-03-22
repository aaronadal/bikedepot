import {CreateCustomerHandler} from "@core/Shop/Customer/application/command/CreateCustomerHandler";
import {DeleteCustomerHandler} from "@core/Shop/Customer/application/command/DeleteCustomerHandler";
import {UpdateCustomerHandler} from "@core/Shop/Customer/application/command/UpdateCustomerHandler";
import {AllCustomersHandler} from "@core/Shop/Customer/application/query/AllCustomersHandler";
import {GetCustomerHandler} from "@core/Shop/Customer/application/query/GetCustomerHandler";
import {container, Lifecycle} from "tsyringe";
import {SetCreditHandler} from "@core/Shop/Customer/application/command/SetCreditHandler";
import {DynamoDbCustomerRepository} from "@core/Shop/Customer/infrastructure/persistence/DynamoDbCustomerRepository";
import {APP_CONFIG} from "@apps/shop/config";
import {InMemoryCustomerRepository} from "@core/Shop/Customer/infrastructure/persistence/InMemoryCustomerRepository";

container.register("CustomersTableName", {
  useValue: APP_CONFIG.dynamoDb.customersTableName,
});

if(process.env.IN_MEMORY_REPOSITORY === '1') {
  container.register(
      "CustomerRepository",
      {useClass: InMemoryCustomerRepository},
      {lifecycle: Lifecycle.Singleton},
  );
}
else {
  container.register(
      "CustomerRepository",
      {useClass: DynamoDbCustomerRepository},
      {lifecycle: Lifecycle.Singleton},
  );
}

container.register("CommandHandler", CreateCustomerHandler, { lifecycle: Lifecycle.Singleton });
container.register("CommandHandler", DeleteCustomerHandler, { lifecycle: Lifecycle.Singleton });
container.register("CommandHandler", UpdateCustomerHandler, { lifecycle: Lifecycle.Singleton });
container.register("CommandHandler", SetCreditHandler, { lifecycle: Lifecycle.Singleton });

container.register("QueryHandler", GetCustomerHandler, { lifecycle: Lifecycle.Singleton });
container.register("QueryHandler", AllCustomersHandler, { lifecycle: Lifecycle.Singleton });
