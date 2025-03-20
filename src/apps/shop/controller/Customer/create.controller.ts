import { CommandBus } from "@core/Shared/domain/bus/command/CommandBus";
import { PrimitiveExtractor } from "@core/Shared/domain/PrimitiveExtractor";
import { Context } from "hono";
import { inject, singleton } from "tsyringe";
import {CreateCustomerCommand} from "@core/Shop/Customer/application/command/CreateCustomerCommand";
import {CustomerId} from "@core/Shop/Customer/domain/entity/CustomerId";
import {CustomerName} from "@core/Shop/Customer/domain/entity/CustomerName";
import {CustomerEmail} from "@core/Shop/Customer/domain/entity/CustomerEmail";
import {CustomerAddressAddress} from "@core/Shop/Customer/domain/entity/CustomerAddressAddress";
import {CustomerAddressCity} from "@core/Shop/Customer/domain/entity/CustomerAddressCity";
import {CustomerAddressPostalCode} from "@core/Shop/Customer/domain/entity/CustomerAddressPostalCode";

@singleton()
export class CreateController {
    constructor(
        @inject("CommandBus") private readonly bus: CommandBus
    ) {
    }

    async invoke(c: Context) {
        const body = await c.req.json()
        const extractor = PrimitiveExtractor.for(body);

        const id = CustomerId.random()
        const name = extractor.nonEmptyString('name')
        const email = extractor.nonEmptyString('email')
        const address = extractor.nonEmptyString('address', 'address')
        const city = extractor.nonEmptyString('address', 'city')
        const postalCode = extractor.nonEmptyString('address', 'postalCode')

        await this.bus.dispatch(
            new CreateCustomerCommand(
                id,
                CustomerName.fromValue(name),
                CustomerEmail.fromValue(email),
                CustomerAddressAddress.fromValue(address),
                CustomerAddressCity.fromValue(city),
                CustomerAddressPostalCode.fromValue(postalCode),
            )
        );

        return c.json({ id: id.value }, 201)
    }
}
