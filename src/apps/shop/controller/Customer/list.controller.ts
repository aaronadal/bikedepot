import { QueryBus } from "@core/Shared/domain/bus/query/QueryBus";
import { AllCustomersQuery } from "@core/Shop/Customer/application/query/AllCustomersQuery";
import { CustomerView } from "@core/Shop/Customer/application/view/CustomerView";
import { Context } from "hono";
import { inject, singleton } from "tsyringe";

@singleton()
export class ListController {
  constructor(@inject("QueryBus") private readonly bus: QueryBus) {}

  async invoke(c: Context) {
    const result = await this.bus.ask<CustomerView[]>(
      new AllCustomersQuery({ field: "credit", order: "desc" }),
    );

    return c.json(result);
  }
}
