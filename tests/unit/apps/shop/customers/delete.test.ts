import { app } from "@apps/shop/app";
import { container } from "@apps/shop/container";
import { CustomerMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";
import { CustomerRepository } from "@core/Shop/Customer/domain/persistence/CustomerRepository";
import { TestEventBus } from "@core/Shared/infrastructure/bus/event/TestEventBus";
import { CustomerDeleted } from "@core/Shop/Customer/domain/event/CustomerDeleted";

describe("[PUT] /customers/:id", () => {
  let repo: CustomerRepository;
  let bus: TestEventBus;

  beforeEach(() => {
    container.clearInstances();

    repo = container.resolve("CustomerRepository");
    bus = container.resolve("EventBus");
  });

  it("should return 204 and update data", async () => {
    const customer = CustomerMother.create();

    await repo.save(customer);

    const res = await app.request(`/customers/${customer.id.value}`, {
      method: "DELETE",
    });

    expect(res.status).toBe(204);
    expect(res.body).toBeNull();

    expect(await repo.search(customer.id)).toBeNull();

    expect(bus.calls).toHaveLength(1);
    expect(TestEventBus.getEventsData(bus.calls[0])).toMatchObject(
      TestEventBus.getEventsData([
        new CustomerDeleted({
          entityId: customer.id.value,
        }),
      ]),
    );
  });

  it("should return 404 if customer not found", async () => {
    const customer = CustomerMother.create();

    const res = await app.request(`/customers/${customer.id.value}`, {
      method: "DELETE",
    });

    expect(res.status).toBe(404);
    expect(bus.calls).toHaveLength(0);
  });
});
