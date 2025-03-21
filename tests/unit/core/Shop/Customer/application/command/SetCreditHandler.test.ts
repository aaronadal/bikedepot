import "reflect-metadata";
import { EntityNotFoundError } from "@core/Shared/domain/error/EntityNotFoundError";
import { EventBusMocker } from "@test/mocker/core/Shared/domain/bus/event/EventBus.mocker";
import { CustomerRepositoryMocker } from "@test/mocker/core/Shop/Customer/domain/persistence/CustomerRepository.mocker";
import { CustomerMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";
import { SetCreditHandler } from "@core/Shop/Customer/application/command/SetCreditHandler";
import { SetCreditCommand } from "@core/Shop/Customer/application/command/SetCreditCommand";
import { CustomerCreditMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerCreditMother";
import { CustomerCreditChanged } from "@core/Shop/Customer/domain/event/CustomerCreditChanged";

describe("SetCreditHandler", () => {
  let repo: CustomerRepositoryMocker;
  let bus: EventBusMocker;
  let handler: SetCreditHandler;

  beforeEach(() => {
    repo = new CustomerRepositoryMocker();
    bus = new EventBusMocker();

    handler = new SetCreditHandler(repo.mock, bus.mock);
  });

  it("should support the command", async () => {
    expect(handler.supports()).toBe(SetCreditCommand);
  });

  it("should set the customer credit successfully", async () => {
    const customer = CustomerMother.create();
    const command = new SetCreditCommand(
      customer.id,
      CustomerCreditMother.different(customer.credit),
    );

    repo.found(customer);

    await handler.handle(command);

    repo.assertSaved(customer);
    bus.assertPublished([
      new CustomerCreditChanged({
        entityId: command.id.value,
        credit: command.credit.value,
      }),
    ]);
  });

  it("should fail if Customer not found", async () => {
    const customer = CustomerMother.create();
    const command = new SetCreditCommand(customer.id, customer.credit);

    repo.notFound();

    await expect(async () => {
      await handler.handle(command);
    }).rejects.toThrow(EntityNotFoundError);
  });
});
