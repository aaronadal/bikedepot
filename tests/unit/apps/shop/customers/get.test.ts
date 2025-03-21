import { app } from "@apps/shop/app";
import { container } from "tsyringe";
import { CustomerMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";
import { CustomerView } from "@core/Shop/Customer/application/view/CustomerView";
import { CustomerRepository } from "@core/Shop/Customer/domain/persistence/CustomerRepository";
import { CustomerId } from "@core/Shop/Customer/domain/entity/CustomerId";

describe("[GET] /customers/:id", () => {
  let repo: CustomerRepository;

  beforeEach(() => {
    container.clearInstances();

    repo = container.resolve("CustomerRepository");
  });

  it("should return 200 with the JSON", async () => {
    const customer = CustomerMother.create();
    const view = CustomerView.fromCustomer(customer);

    await repo.save(customer);

    const res = await app.request(`/customers/${customer.id.value}`);

    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject(view);

    await repo.delete(customer.id);
  });

  it("should return 404 if not found", async () => {
    const res = await app.request(`/customers/${CustomerId.random().value}`);

    expect(res.status).toBe(404);
  });
});
