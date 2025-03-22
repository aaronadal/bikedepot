import { app } from "@apps/shop/app";
import { container } from "@apps/shop/container";
import { CustomerMother } from "@test/mother/core/Shop/Customer/domain/entity/CustomerMother";
import { CustomerView } from "@core/Shop/Customer/application/view/CustomerView";
import { CustomerRepository } from "@core/Shop/Customer/domain/persistence/CustomerRepository";
import { CustomerCredit } from "@core/Shop/Customer/domain/entity/CustomerCredit";

describe("[GET] /customers", () => {
  let repo: CustomerRepository;

  beforeEach(() => {
    container.clearInstances();

    repo = container.resolve("CustomerRepository");
  });

  it("should return 200 with the JSON sorted by credit", async () => {
    const customers = [
      CustomerMother.create({ credit: CustomerCredit.fromValue(1000) }),
      CustomerMother.create({ credit: CustomerCredit.fromValue(23) }),
      CustomerMother.create({ credit: CustomerCredit.fromValue(148) }),
      CustomerMother.create({ credit: CustomerCredit.fromValue(1036) }),
      CustomerMother.create({ credit: CustomerCredit.fromValue(512) }),
    ];
    const views = [
      CustomerView.fromCustomer(customers[3]),
      CustomerView.fromCustomer(customers[0]),
      CustomerView.fromCustomer(customers[4]),
      CustomerView.fromCustomer(customers[2]),
      CustomerView.fromCustomer(customers[1]),
    ];

    for (const customer of customers) {
      await repo.save(customer);
    }

    const res = await app.request(`/customers`);

    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject(views);

    for (const customer of customers) {
      await repo.delete(customer.id);
    }
  });
});
