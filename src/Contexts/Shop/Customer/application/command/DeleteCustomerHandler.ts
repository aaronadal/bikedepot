import { Command } from "../../../../Shared/domain/bus/command/Command";
import { CommandHandler } from "../../../../Shared/domain/bus/command/CommandHandler";
import { EventBus } from "../../../../Shared/domain/bus/event/EventBus";
import { CustomerFinder } from "../../domain/persistence/CustomerFinder";
import { CustomerRepository } from "../../domain/persistence/CustomerRepository";
import { DeleteCustomerCommand } from "./DeleteCustomerCommand";

export class DeleteCustomerHandler implements CommandHandler<DeleteCustomerCommand> {
    private readonly finder: CustomerFinder;

    constructor(
        private readonly repo: CustomerRepository,
        private readonly bus: EventBus,
    ) {
        this.finder = new CustomerFinder(repo);
    }

    supports(): Command {
        return DeleteCustomerCommand;
    }

    async handle(command: DeleteCustomerCommand): Promise<void> {
        const customer = await this.finder.invoke(command.id);

        await this.repo.delete(customer.id);
        customer.deleted();

        await this.bus.publish(customer.pullEvents());
    }
}
