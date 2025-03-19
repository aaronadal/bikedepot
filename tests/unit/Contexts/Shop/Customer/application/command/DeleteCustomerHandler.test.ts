import { EntityNotFoundError } from "../../../../../../../src/Contexts/Shared/domain/error/EntityNotFoundError";
import { DeleteCustomerCommand } from "../../../../../../../src/Contexts/Shop/Customer/application/command/DeleteCustomerCommand";
import { DeleteCustomerHandler } from "../../../../../../../src/Contexts/Shop/Customer/application/command/DeleteCustomerHandler";
import { CustomerCredit } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerCredit";
import { CustomerAddressChanged } from "../../../../../../../src/Contexts/Shop/Customer/domain/event/CustomerAddressChanged";
import { CustomerDeleted } from "../../../../../../../src/Contexts/Shop/Customer/domain/event/CustomerDeleted";
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
