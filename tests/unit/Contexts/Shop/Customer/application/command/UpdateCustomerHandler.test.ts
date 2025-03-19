import { EntityNotFoundError } from "../../../../../../../src/Contexts/Shared/domain/error/EntityNotFoundError";
import { UpdateCustomerCommand } from "../../../../../../../src/Contexts/Shop/Customer/application/command/UpdateCustomerCommand";
import { UpdateCustomerHandler } from "../../../../../../../src/Contexts/Shop/Customer/application/command/UpdateCustomerHandler";
import { CustomerAddressChanged } from "../../../../../../../src/Contexts/Shop/Customer/domain/event/CustomerAddressChanged";
import { CustomerEmailChanged } from "../../../../../../../src/Contexts/Shop/Customer/domain/event/CustomerEmailChanged";
import { CustomerNameChanged } from "../../../../../../../src/Contexts/Shop/Customer/domain/event/CustomerNameChanged";
import { CustomerUpdated } from "../../../../../../../src/Contexts/Shop/Customer/domain/event/CustomerUpdated";
import { EventBusMocker } from "../../../../../../mocker/Contexts/Shared/domain/bus/event/EventBus.mocker";
import { CustomerRepositoryMocker } from "../../../../../../mocker/Contexts/Shop/Customer/domain/persistence/CustomerRepository.mocker";
import { CustomerAddressAddressMother } from "../../../../../../mother/Contexts/Shop/Customer/domain/entity/CustomerAddressAddressMother";
import { CustomerAddressCityMother } from "../../../../../../mother/Contexts/Shop/Customer/domain/entity/CustomerAddressCityMother";
import { CustomerAddressPostalCodeMother } from "../../../../../../mother/Contexts/Shop/Customer/domain/entity/CustomerAddressPostalCodeMother";
import { CustomerEmailMother } from "../../../../../../mother/Contexts/Shop/Customer/domain/entity/CustomerEmailMother";
import { CustomerMother } from "../../../../../../mother/Contexts/Shop/Customer/domain/entity/CustomerMother";
import { CustomerNameMother } from "../../../../../../mother/Contexts/Shop/Customer/domain/entity/CustomerNameMother";

describe('UpdateCustomerHandler', () => {
    let repo: CustomerRepositoryMocker;
    let bus: EventBusMocker;
    let handler: UpdateCustomerHandler;

    beforeEach(() => {
        repo = new CustomerRepositoryMocker()
        bus = new EventBusMocker()

        handler = new UpdateCustomerHandler(repo.mock, bus.mock)
    })

    it('should support the command', async() => {
        expect(handler.supports()).toBe(UpdateCustomerCommand);
    });

    it('should update the customer successfully', async() => {
        const customer = CustomerMother.create();
        const command = new UpdateCustomerCommand(
            customer.id,
            CustomerNameMother.different(customer.name),
            CustomerEmailMother.different(customer.email),
            CustomerAddressAddressMother.different(customer.address.address),
            CustomerAddressCityMother.different(customer.address.city),
            CustomerAddressPostalCodeMother.different(customer.address.postalCode),
        );

        repo.found(customer)

        await handler.handle(command)

        repo.assertSaved(customer)
        bus.assertPublished([
            new CustomerNameChanged({
                entityId: command.id.value,
                name: command.name.value,
            }),
            new CustomerEmailChanged({
                entityId: command.id.value,
                email: command.email.value,
            }),
            new CustomerAddressChanged({
                entityId: command.id.value,
                address: command.address.value,
                city: command.city.value,
                postalCode: command.postalCode.value,
            }),
            new CustomerUpdated({
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

    it('should fail if Customer not found', async() => {
        const customer = CustomerMother.create();
        const command = new UpdateCustomerCommand(
            customer.id,
            customer.name,
            customer.email,
            customer.address.address,
            customer.address.city,
            customer.address.postalCode,
        );

        repo.notFound()

        await expect(async () => {
            await handler.handle(command)
        }).rejects.toThrow(EntityNotFoundError)
    })
});
