import { Command } from "@core/Shared/domain/bus/command/Command";
import { CustomerId } from "../../domain/entity/CustomerId";

export class DeleteCustomerCommand implements Command {
  constructor(public readonly id: CustomerId) {}
}
