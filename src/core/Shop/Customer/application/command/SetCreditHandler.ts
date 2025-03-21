import { CommandHandler } from "@core/Shared/domain/bus/command/CommandHandler";
import { SetCreditCommand } from "@core/Shop/Customer/application/command/SetCreditCommand";
import { CustomerFinder } from "@core/Shop/Customer/domain/persistence/CustomerFinder";
import { inject, injectable } from "tsyringe";
import { CustomerRepository } from "@core/Shop/Customer/domain/persistence/CustomerRepository";
import { EventBus } from "@core/Shared/domain/bus/event/EventBus";

@injectable()
export class SetCreditHandler implements CommandHandler<SetCreditCommand> {
  private readonly finder: CustomerFinder;

  constructor(
    @inject("CustomerRepository") private readonly repo: CustomerRepository,
    @inject("EventBus") private readonly bus: EventBus,
  ) {
    this.finder = new CustomerFinder(repo);
  }

  supports() {
    return SetCreditCommand;
  }

  async handle(command: SetCreditCommand): Promise<void> {
    const customer = await this.finder.invoke(command.id);

    customer.credit = command.credit;

    this.repo.save(customer);

    await this.bus.publish(customer.pullEvents());
  }
}
