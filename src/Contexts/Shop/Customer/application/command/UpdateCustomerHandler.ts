import { EventBus } from "../../../../Shared/domain/bus/event/EventBus";
import { Command } from "../../../../Shared/domain/bus/command/Command";
import { CommandHandler } from "../../../../Shared/domain/bus/command/CommandHandler";
import { CustomerAddress } from "../../domain/entity/CustomerAddress";
import { CustomerRepository } from "../../domain/persistence/CustomerRepository";
import { UpdateCustomerCommand } from "./UpdateCustomerCommand";
import { CustomerFinder } from "../../domain/persistence/CustomerFinder";

export class UpdateCustomerHandler implements CommandHandler<UpdateCustomerCommand> {
    private readonly finder: CustomerFinder;

    constructor(
        private readonly repo: CustomerRepository,
        private readonly bus: EventBus,
    ) {
        this.finder = new CustomerFinder(repo);
    }

    supports(): Command {
        return UpdateCustomerCommand;
    }

    async handle(command: UpdateCustomerCommand): Promise<void> {
        const customer = await this.finder.invoke(command.id);

        customer.name = command.name
        customer.email = command.email
        customer.address = CustomerAddress.create(
            command.address,
            command.city,
            command.postalCode,
        )
        customer.updated()

        await this.repo.save(customer);

        await this.bus.publish(customer.pullEvents());
    }
}
