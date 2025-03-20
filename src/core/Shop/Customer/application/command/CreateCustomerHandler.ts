import {inject, singleton} from "tsyringe";
import {CommandHandler} from "@core/Shared/domain/bus/command/CommandHandler";
import {EventBus} from "@core/Shared/domain/bus/event/EventBus";
import {Customer} from "../../domain/entity/Customer";
import {CustomerAddress} from "../../domain/entity/CustomerAddress";
import {CustomerRepository} from "../../domain/persistence/CustomerRepository";
import {CreateCustomerCommand} from "./CreateCustomerCommand";

@singleton()
export class CreateCustomerHandler implements CommandHandler<CreateCustomerCommand> {
    constructor(
        @inject('CustomerRepository') private readonly repo: CustomerRepository,
        @inject('EventBus') private readonly bus: EventBus,
    ) {
    }

    supports() {
        return CreateCustomerCommand;
    }

    async handle(command: CreateCustomerCommand) {
        const customer = Customer.create(
            command.id,
            command.name,
            command.email,
            CustomerAddress.create(
                command.address,
                command.city,
                command.postalCode,
            ),
        );

        
        await this.repo.save(customer);

        await this.bus.publish(customer.pullEvents());
    }
}
