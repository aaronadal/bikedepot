import {CommandBus} from "@core/Shared/domain/bus/command/CommandBus";
import {PrimitiveExtractor} from "@core/Shared/domain/PrimitiveExtractor";
import {Context} from "hono";
import {inject, singleton} from "tsyringe";
import {CustomerId} from "@core/Shop/Customer/domain/entity/CustomerId";
import {SetCreditCommand} from "@core/Shop/Customer/application/command/SetCreditCommand";
import {CustomerCredit} from "@core/Shop/Customer/domain/entity/CustomerCredit";

@singleton()
export class SetCreditController {
    constructor(
        @inject("CommandBus") private readonly bus: CommandBus
    ) {
    }

    async invoke(c: Context) {
        const body = await c.req.json()
        const extractor = PrimitiveExtractor.for(body);

        const id = c.req.param('id')
        const credit = extractor.integer('credit')

        await this.bus.dispatch(
            new SetCreditCommand(
                CustomerId.fromValue(id),
                CustomerCredit.fromValue(credit),
            )
        );

        return c.body(null, 204)
    }
}
