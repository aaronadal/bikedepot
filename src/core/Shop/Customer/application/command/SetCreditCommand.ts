import { Command } from "@core/Shared/domain/bus/command/Command";
import { CustomerId } from "@core/Shop/Customer/domain/entity/CustomerId";
import { CustomerCredit } from "@core/Shop/Customer/domain/entity/CustomerCredit";

export class SetCreditCommand implements Command {
  constructor(
    readonly id: CustomerId,
    readonly credit: CustomerCredit,
  ) {}
}
