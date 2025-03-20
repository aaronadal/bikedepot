import { inject, singleton } from "tsyringe";
import { CommandHandler } from "@core/Shared/domain/bus/command/CommandHandler";
import { EventBus } from "@core/Shared/domain/bus/event/EventBus";
import { CustomerAddress } from "../../domain/entity/CustomerAddress";
import { CustomerFinder } from "../../domain/persistence/CustomerFinder";
import { CustomerRepository } from "../../domain/persistence/CustomerRepository";
import { UpdateCustomerCommand } from "./UpdateCustomerCommand";

@singleton()
export class UpdateCustomerHandler implements CommandHandler<UpdateCustomerCommand> {
    private readonly finder: CustomerFinder;

    constructor(
        @inject('CustomerRepository') private readonly repo: CustomerRepository,
        @inject('EventBus') private readonly bus: EventBus,
    ) {
        this.finder = new CustomerFinder(repo);
    }

    supports() {
        return UpdateCustomerCommand;
    }

    async handle(command: UpdateCustomerCommand) {
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
