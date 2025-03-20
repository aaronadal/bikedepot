import { Command } from "../../../../Shared/domain/bus/command/Command";
import { CustomerAddressAddress } from "../../domain/entity/CustomerAddressAddress";
import { CustomerAddressCity } from "../../domain/entity/CustomerAddressCity";
import { CustomerAddressPostalCode } from "../../domain/entity/CustomerAddressPostalCode";
import { CustomerEmail } from "../../domain/entity/CustomerEmail";
import { CustomerId } from "../../domain/entity/CustomerId";
import { CustomerName } from "../../domain/entity/CustomerName";

export class UpdateCustomerCommand implements Command {
    constructor(
        public readonly id: CustomerId,
        public readonly name: CustomerName,
        public readonly email: CustomerEmail,
        public readonly address: CustomerAddressAddress,
        public readonly city: CustomerAddressCity,
        public readonly postalCode: CustomerAddressPostalCode,
    ) {}
}
