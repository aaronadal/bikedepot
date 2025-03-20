import { EntityNotFoundError } from "@core/Shared/domain/error/EntityNotFoundError";
import { GetCustomerHandler } from "@core/Shop/Customer/application/query/GetCustomerHandler";
import { GetCustomerQuery } from "@core/Shop/Customer/application/query/GetCustomerQuery";
import { CustomerView } from "@core/Shop/Customer/application/view/CustomerView";
import { CustomerRepositoryMocker } from "@test/mocker/core/Shop/Customer/domain/persistence/CustomerRepository.mocker"
import { CustomerMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";

describe('GetCustomerHandler', () => {
    let repo: CustomerRepositoryMocker
    let handler: GetCustomerHandler

    beforeEach(() => {
        repo = new CustomerRepositoryMocker()
        handler = new GetCustomerHandler(repo.mock)
    })

    it('should return the view successfully', async () => {
        const customer = CustomerMother.create()
        const query = new GetCustomerQuery(customer.id.value)

        repo.found(customer)

        const view = await handler.handle(query)

        expect(view).toMatchObject(CustomerView.fromCustomer(customer))
    })

    it('should fail if Customer not found', async() => {
        const customer = CustomerMother.create();
        const command = new GetCustomerQuery(customer.id.value);

        repo.notFound()

        await expect(async () => {
            await handler.handle(command)
        }).rejects.toThrow(EntityNotFoundError)
    })
})
