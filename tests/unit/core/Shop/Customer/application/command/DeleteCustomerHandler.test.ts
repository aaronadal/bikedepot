import { EventBusMocker } from "@test/mocker/core/Shared/domain/bus/event/EventBus.mocker";
import { EntityNotFoundError } from "@core/Shared/domain/error/EntityNotFoundError";
import { DeleteCustomerCommand } from "@core/Shop/Customer/application/command/DeleteCustomerCommand";
import { DeleteCustomerHandler } from "@core/Shop/Customer/application/command/DeleteCustomerHandler";
import { CustomerMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";
import { CustomerDeleted } from "@core/Shop/Customer/domain/event/CustomerDeleted";
import { CustomerRepositoryMocker } from "@test/mocker/core/Shop/Customer/domain/persistence/CustomerRepository.mocker";

describe('DeleteCustomerHandler', () => {
    let repo: CustomerRepositoryMocker;
    let bus: EventBusMocker;
    let handler: DeleteCustomerHandler;

    beforeEach(() => {
        repo = new CustomerRepositoryMocker()
        bus = new EventBusMocker()

        handler = new DeleteCustomerHandler(repo.mock, bus.mock)
    })

    it('should support the command', async() => {
        expect(handler.supports()).toBe(DeleteCustomerCommand);
    });

    it('should delete the customer successfully', async() => {
        const customer = CustomerMother.create();
        const command = new DeleteCustomerCommand(customer.id);

        repo.found(customer)

        await handler.handle(command)

        repo.assertDeleted(customer.id)
        bus.assertPublished([
            new CustomerDeleted({
                entityId: command.id.value,
            }),
        ])
    })

    it('should fail if Customer not found', async() => {
        const customer = CustomerMother.create();
        const command = new DeleteCustomerCommand(customer.id);

        repo.notFound()

        await expect(async () => {
            await handler.handle(command)
        }).rejects.toThrow(EntityNotFoundError)
    })
});
