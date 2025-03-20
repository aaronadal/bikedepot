import {app} from "@apps/shop/app";
import {container} from "tsyringe";
import {CustomerMother} from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";
import {CustomerView} from "@core/Shop/Customer/application/view/CustomerView";
import {CustomerRepository} from "@core/Shop/Customer/domain/persistence/CustomerRepository";
import {CustomerCredit} from "@core/Shop/Customer/domain/entity/CustomerCredit";
import {TestEventBus} from "@core/Shared/infrastructure/bus/event/TestEventBus";
import {CustomerId} from "@core/Shop/Customer/domain/entity/CustomerId";
import {CustomerCreated} from "@core/Shop/Customer/domain/event/CustomerCreated";

describe('[POST] /customers', () => {
    let repo: CustomerRepository;
    let bus: TestEventBus;

    beforeEach(() => {
        container.clearInstances();

        repo = container.resolve('CustomerRepository')
        bus = container.resolve('EventBus')
    })

    it('should return 201 with the ID', async () => {
        const customer = CustomerMother.create({ credit: CustomerCredit.empty() })
        const view = CustomerView.fromCustomer(customer)
        const {id, credit, ...body} = view;

        const res = await app.request(`/customers`, {method: 'POST', body: JSON.stringify(body)})
        const json = await res.json()

        expect(res.status).toBe(201)
        expect(json.id).toBeDefined()

        const createdCustomer = CustomerMother.create({
            id: CustomerId.fromValue(json.id),
            name: customer.name,
            email: customer.email,
            address: customer.address,
            credit: customer.credit,
        })
        const storedCustomer = await repo.search(createdCustomer.id)

        expect(storedCustomer).toMatchObject(createdCustomer)

        expect(bus.calls).toHaveLength(1)
        expect(TestEventBus.getEventsData(bus.calls[0])).toMatchObject(TestEventBus.getEventsData([
            new CustomerCreated({
                entityId: createdCustomer.id.value,
                name: createdCustomer.name.value,
                email: createdCustomer.email.value,
                address: {
                    address: createdCustomer.address.address.value,
                    city: createdCustomer.address.city.value,
                    postalCode: createdCustomer.address.postalCode.value,
                },
            })
        ]))
    })

    const cases = ['name', 'email', 'address'] as const
    it.each(cases)('should return 400 if payload is wrong', async (field) => {
        const customer = CustomerMother.create()
        const view = CustomerView.fromCustomer(customer)
        const {id, credit, [field]: _, ...body} = view;

        const res = await app.request(`/customers`, {method: 'POST', body: JSON.stringify(body)})

        expect(res.status).toBe(400)
        expect(bus.calls).toHaveLength(0)
    })
})
