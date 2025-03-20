import {QueryBus} from "@core/Shared/domain/bus/query/QueryBus";
import {CustomerView} from "@core/Shop/Customer/application/view/CustomerView";
import {Context} from "hono";
import {inject, singleton} from "tsyringe";
import {GetCustomerQuery} from "@core/Shop/Customer/application/query/GetCustomerQuery";

@singleton()
export class GetController {
    constructor(
        @inject("QueryBus") private readonly bus: QueryBus
    ) {
    }

    async invoke(c: Context) {
        const id = c.req.param('id')

        const result = await this.bus.ask<CustomerView>(new GetCustomerQuery(id))

        return c.json(result)
    }
}
