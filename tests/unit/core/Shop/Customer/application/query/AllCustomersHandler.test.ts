import { AllCustomersHandler } from "@core/Shop/Customer/application/query/AllCustomersHandler";
import { AllCustomersQuery } from "@core/Shop/Customer/application/query/AllCustomersQuery";
import { CustomerView } from "@core/Shop/Customer/application/view/CustomerView";
import { CustomerRepositoryMocker } from "@test/mocker/core/Shop/Customer/domain/persistence/CustomerRepository.mocker";
import { MultipleMother } from "@test/mother/core/Shared/domain/MultipleMother";
import { CustomerMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";

describe('AllCustomersHandler', () => {
    let repo: CustomerRepositoryMocker
    let handler: AllCustomersHandler

    beforeEach(() => {
        repo = new CustomerRepositoryMocker()
        handler = new AllCustomersHandler(repo.mock)
    })

    it('should return the views successfully', async () => {
        const customers = MultipleMother.random(() => CustomerMother.create())
        const views = customers.map((customer) => CustomerView.fromCustomer(customer))
        const query = new AllCustomersQuery()

        repo.all(customers)

        const view = await handler.handle(query)

        repo.assertAll(query.orderBy)
        expect(view).toMatchObject(views)
    })
})
