import { app } from "@apps/shop/app";
import { container } from "@apps/shop/container";
import { CustomerMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";
import { CustomerView } from "@core/Shop/Customer/application/view/CustomerView";
import { CustomerRepository } from "@core/Shop/Customer/domain/persistence/CustomerRepository";
import { TestEventBus } from "@core/Shared/infrastructure/bus/event/TestEventBus";
import { CustomerNameMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerNameMother";
import { CustomerEmailMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerEmailMother";
import { CustomerAddressMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerAddressMother";
import { CustomerAddressAddressMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerAddressAddressMother";
import { CustomerAddressCityMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerAddressCityMother";
import { CustomerAddressPostalCodeMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerAddressPostalCodeMother";
import { CustomerUpdated } from "@core/Shop/Customer/domain/event/CustomerUpdated";
import { CustomerNameChanged } from "@core/Shop/Customer/domain/event/CustomerNameChanged";
import { CustomerEmailChanged } from "@core/Shop/Customer/domain/event/CustomerEmailChanged";
import { CustomerAddressChanged } from "@core/Shop/Customer/domain/event/CustomerAddressChanged";

describe("[PUT] /customers/:id", () => {
  let repo: CustomerRepository;
  let bus: TestEventBus;

  beforeEach(() => {
    container.clearInstances();

    repo = container.resolve("CustomerRepository");
    bus = container.resolve("EventBus");
  });

  it("should return 204 and update data", async () => {
    const oldCustomer = CustomerMother.create();
    const customer = CustomerMother.create({
      id: oldCustomer.id,
      name: CustomerNameMother.different(oldCustomer.name),
      email: CustomerEmailMother.different(oldCustomer.email),
      address: CustomerAddressMother.create({
        address: CustomerAddressAddressMother.different(
          oldCustomer.address.address,
        ),
        city: CustomerAddressCityMother.different(oldCustomer.address.city),
        postalCode: CustomerAddressPostalCodeMother.different(
          oldCustomer.address.postalCode,
        ),
      }),
      credit: oldCustomer.credit,
    });
    const view = CustomerView.fromCustomer(customer);
    const { id, credit, ...body } = view;

    await repo.save(oldCustomer);

    const res = await app.request(`/customers/${customer.id.value}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    expect(res.status).toBe(204);
    expect(res.body).toBeNull();

    const storedCustomer = await repo.search(customer.id);

    expect(storedCustomer).toMatchObject(customer);

    expect(bus.calls).toHaveLength(1);
    expect(TestEventBus.getEventsData(bus.calls[0])).toMatchObject(
      TestEventBus.getEventsData([
        new CustomerNameChanged({
          entityId: customer.id.value,
          name: customer.name.value,
        }),
        new CustomerEmailChanged({
          entityId: customer.id.value,
          email: customer.email.value,
        }),
        new CustomerAddressChanged({
          entityId: customer.id.value,
          address: customer.address.address.value,
          city: customer.address.city.value,
          postalCode: customer.address.postalCode.value,
        }),
        new CustomerUpdated({
          entityId: customer.id.value,
          name: customer.name.value,
          email: customer.email.value,
          address: {
            address: customer.address.address.value,
            city: customer.address.city.value,
            postalCode: customer.address.postalCode.value,
          },
        }),
      ]),
    );
  });

  it("should return 204 and do nothing if nothing changed", async () => {
    const oldCustomer = CustomerMother.create();
    const customer = CustomerMother.create({
      id: oldCustomer.id,
      name: oldCustomer.name,
      email: oldCustomer.email,
      address: oldCustomer.address,
      credit: oldCustomer.credit,
    });
    const view = CustomerView.fromCustomer(customer);
    const { id, credit, ...body } = view;

    await repo.save(oldCustomer);

    const res = await app.request(`/customers/${customer.id.value}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    expect(res.status).toBe(204);
    expect(res.body).toBeNull();

    const storedCustomer = await repo.search(customer.id);

    expect(storedCustomer).toMatchObject(customer);

    expect(bus.calls).toHaveLength(1);
    expect(bus.calls[0]).toHaveLength(0);
  });

  it("should return 404 if customer not found", async () => {
    const customer = CustomerMother.create();
    const view = CustomerView.fromCustomer(customer);
    const { id, credit, ...body } = view;

    const res = await app.request(`/customers/${customer.id.value}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    expect(res.status).toBe(404);
    expect(bus.calls).toHaveLength(0);
  });

  const cases = ["name", "email", "address"] as const;
  it.each(cases)("should return 400 if payload is wrong", async (field) => {
    const customer = CustomerMother.create();
    const view = CustomerView.fromCustomer(customer);
    const { id, credit, [field]: _, ...body } = view;

    await repo.save(customer);

    const res = await app.request(`/customers/${customer.id.value}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    expect(res.status).toBe(400);
    expect(bus.calls).toHaveLength(0);
  });
});
