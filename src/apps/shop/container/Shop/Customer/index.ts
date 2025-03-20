import {CreateCustomerHandler} from "@core/Shop/Customer/application/command/CreateCustomerHandler";
import {DeleteCustomerHandler} from "@core/Shop/Customer/application/command/DeleteCustomerHandler";
import {UpdateCustomerHandler} from "@core/Shop/Customer/application/command/UpdateCustomerHandler";
import {AllCustomersHandler} from "@core/Shop/Customer/application/query/AllCustomersHandler";
import {GetCustomerHandler} from "@core/Shop/Customer/application/query/GetCustomerHandler";
import {InMemoryCustomerRepository} from "@core/Shop/Customer/infrastructure/persistence/InMemoryCustomerRepository";
import {container, Lifecycle} from "tsyringe";

container.register('CustomerRepository', { useClass: InMemoryCustomerRepository }, { lifecycle: Lifecycle.Singleton })

container.register('CommandHandler', CreateCustomerHandler)
container.register('CommandHandler', DeleteCustomerHandler)
container.register('CommandHandler', UpdateCustomerHandler)

container.register('QueryHandler', GetCustomerHandler)
container.register('QueryHandler', AllCustomersHandler)
