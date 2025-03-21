import { CommandBus } from "@core/Shared/domain/bus/command/CommandBus";
import { Context } from "hono";
import { inject, singleton } from "tsyringe";
import { CustomerId } from "@core/Shop/Customer/domain/entity/CustomerId";
import { DeleteCustomerCommand } from "@core/Shop/Customer/application/command/DeleteCustomerCommand";

@singleton()
export class DeleteController {
  constructor(@inject("CommandBus") private readonly bus: CommandBus) {}

  async invoke(c: Context) {
    const id = c.req.param("id");

    await this.bus.dispatch(
      new DeleteCustomerCommand(CustomerId.fromValue(id)),
    );

    return c.body(null, 204);
  }
}
