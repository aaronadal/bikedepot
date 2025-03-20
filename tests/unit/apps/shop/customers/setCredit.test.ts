import {app} from "@apps/shop/app";
import {container} from "tsyringe";
import {CustomerMother} from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";
import {CustomerRepository} from "@core/Shop/Customer/domain/persistence/CustomerRepository";
import {TestEventBus} from "@core/Shared/infrastructure/bus/event/TestEventBus";
import {CustomerCreditMother} from "@test/mother/core/Shop/Customer/domain/entity/CustomerCreditMother";
import {CustomerCreditChanged} from "@core/Shop/Customer/domain/event/CustomerCreditChanged";

describe('[PUT] /customers-credit/:id', () => {
    let repo: CustomerRepository;
    let bus: TestEventBus;

    beforeEach(() => {
        container.clearInstances();

        repo = container.resolve('CustomerRepository')
        bus = container.resolve('EventBus')
    })

    it('should return 204 and update credit', async () => {
        const oldCustomer = CustomerMother.create();
        const customer = CustomerMother.create({
            id: oldCustomer.id,
            name: oldCustomer.name,
            email: oldCustomer.email,
            address: oldCustomer.address,
            credit: CustomerCreditMother.different(oldCustomer.credit),
        })
        const body = {credit: customer.credit.value}

        await repo.save(oldCustomer)

        const res = await app.request(`/customers-credit/${customer.id.value}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })

        expect(res.status).toBe(204)
        expect(res.body).toBeNull()

        const storedCustomer = await repo.search(customer.id)

        expect(storedCustomer).toMatchObject(customer)

        expect(bus.calls).toHaveLength(1)
        expect(TestEventBus.getEventsData(bus.calls[0])).toMatchObject(TestEventBus.getEventsData([
            new CustomerCreditChanged({
                entityId: customer.id.value,
                credit: customer.credit.value,
            }),
        ]))
    })

    it('should return 204 and do nothing if nothing changed', async () => {
        const oldCustomer = CustomerMother.create();
        const customer = CustomerMother.create({
            id: oldCustomer.id,
            name: oldCustomer.name,
            email: oldCustomer.email,
            address: oldCustomer.address,
            credit: oldCustomer.credit,

        })
        const body = {credit: customer.credit.value}

        await repo.save(oldCustomer)

        const res = await app.request(`/customers-credit/${customer.id.value}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        })

        expect(res.status).toBe(204)
        expect(res.body).toBeNull()

        const storedCustomer = await repo.search(customer.id)

        expect(storedCustomer).toMatchObject(customer)

        expect(bus.calls).toHaveLength(1)
        expect(bus.calls[0]).toHaveLength(0)
    })

    it('should return 404 if customer not found', async () => {
        const customer = CustomerMother.create()
        const body = {credit: customer.credit.value}

        const res = await app.request(`/customers-credit/${customer.id.value}`, {method: 'PUT', body: JSON.stringify(body)})

        expect(res.status).toBe(404)
        expect(bus.calls).toHaveLength(0)
    })

    it('should return 400 if payload is wrong', async () => {
        const customer = CustomerMother.create()
        const body = {credit: 'non-numeric'}

        const res = await app.request(`/customers-credit/${customer.id.value}`, {method: 'PUT', body: JSON.stringify(body)})

        expect(res.status).toBe(400)
        expect(bus.calls).toHaveLength(0)
    })
})
