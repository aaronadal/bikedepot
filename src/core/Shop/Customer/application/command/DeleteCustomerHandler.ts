import { inject, singleton } from "tsyringe";
import { CommandHandler } from "../../../../Shared/domain/bus/command/CommandHandler";
import { EventBus } from "../../../../Shared/domain/bus/event/EventBus";
import { CustomerFinder } from "../../domain/persistence/CustomerFinder";
import { CustomerRepository } from "../../domain/persistence/CustomerRepository";
import { DeleteCustomerCommand } from "./DeleteCustomerCommand";

@singleton()
export class DeleteCustomerHandler implements CommandHandler<DeleteCustomerCommand> {
    private readonly finder: CustomerFinder;

    constructor(
        @inject('CustomerRepository') private readonly repo: CustomerRepository,
        @inject('EventBus') private readonly bus: EventBus,
    ) {
        this.finder = new CustomerFinder(repo);
    }

    supports() {
        return DeleteCustomerCommand;
    }

    async handle(command: DeleteCustomerCommand) {
        const customer = await this.finder.invoke(command.id);

        await this.repo.delete(customer.id);
        customer.deleted();

        await this.bus.publish(customer.pullEvents());
    }
}
