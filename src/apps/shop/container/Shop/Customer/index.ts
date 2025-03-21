import { CreateCustomerHandler } from "@core/Shop/Customer/application/command/CreateCustomerHandler";
import { DeleteCustomerHandler } from "@core/Shop/Customer/application/command/DeleteCustomerHandler";
import { UpdateCustomerHandler } from "@core/Shop/Customer/application/command/UpdateCustomerHandler";
import { AllCustomersHandler } from "@core/Shop/Customer/application/query/AllCustomersHandler";
import { GetCustomerHandler } from "@core/Shop/Customer/application/query/GetCustomerHandler";
import { container, Lifecycle } from "tsyringe";
import { SetCreditHandler } from "@core/Shop/Customer/application/command/SetCreditHandler";
import { DynamoDbCustomerRepository } from "@core/Shop/Customer/infrastructure/persistence/DynamoDbCustomerRepository";

container.register(
  "CustomerRepository",
  { useClass: DynamoDbCustomerRepository },
  { lifecycle: Lifecycle.Singleton },
);

container.register("CommandHandler", CreateCustomerHandler);
container.register("CommandHandler", DeleteCustomerHandler);
container.register("CommandHandler", UpdateCustomerHandler);
container.register("CommandHandler", SetCreditHandler);

container.register("QueryHandler", GetCustomerHandler);
container.register("QueryHandler", AllCustomersHandler);
