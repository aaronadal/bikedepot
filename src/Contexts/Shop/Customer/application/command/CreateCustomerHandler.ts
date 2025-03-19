import { EventBus } from "../../../../Shared/domain/bus/event/EventBus";
import { Command } from "../../../../Shared/domain/bus/command/Command";
import { CommandHandler } from "../../../../Shared/domain/bus/command/CommandHandler";
import { Customer } from "../../domain/entity/Customer";
import { CustomerAddress } from "../../domain/entity/CustomerAddress";
import { CustomerRepository } from "../../domain/persistence/CustomerRepository";
import { CreateCustomerCommand } from "./CreateCustomerCommand";

export class CreateCustomerHandler implements CommandHandler<CreateCustomerCommand> {
    constructor(
        private readonly repo: CustomerRepository,
        private readonly bus: EventBus,
    ) {
    }

    supports(): Command {
        return CreateCustomerCommand;
    }

    async handle(command: CreateCustomerCommand): Promise<void> {
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
