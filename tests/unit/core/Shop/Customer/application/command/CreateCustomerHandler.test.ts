import "reflect-metadata";
import { CreateCustomerCommand } from "@core/Shop/Customer/application/command/CreateCustomerCommand";
import { CreateCustomerHandler } from "@core/Shop/Customer/application/command/CreateCustomerHandler";
import { CustomerCredit } from "@core/Shop/Customer/domain/entity/CustomerCredit";
import { CustomerCreated } from "@core/Shop/Customer/domain/event/CustomerCreated";
import { EventBusMocker } from "@test/mocker/core/Shared/domain/bus/event/EventBus.mocker";
import { CustomerRepositoryMocker } from "@test/mocker/core/Shop/Customer/domain/persistence/CustomerRepository.mocker";
import { CustomerMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";

describe('CreateCustomerHandler', () => {
    let repo: CustomerRepositoryMocker;
    let bus: EventBusMocker;
    let handler: CreateCustomerHandler;

    beforeEach(() => {
        repo = new CustomerRepositoryMocker()
        bus = new EventBusMocker()

        handler = new CreateCustomerHandler(repo.mock, bus.mock)
    })

    it('should support the command', async() => {
        expect(handler.supports()).toBe(CreateCustomerCommand);
    });

    it('should create the customer successfully', async() => {
        const customer = CustomerMother.create({
            credit: CustomerCredit.fromValue(0),
        });
        const command = new CreateCustomerCommand(
            customer.id,
            customer.name,
            customer.email,
            customer.address.address,
            customer.address.city,
            customer.address.postalCode,
        );

        await handler.handle(command)

        repo.assertSaved(customer)
        bus.assertPublished([
            new CustomerCreated({
                entityId: customer.id.value,
                name: customer.name.value,
                email: customer.email.value,
                address: {
                    address: customer.address.address.value,
                    city: customer.address.city.value,
                    postalCode: customer.address.postalCode.value,
                }
            })
        ])
    })
});
