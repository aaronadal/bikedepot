import { Command } from "@core/Shared/domain/bus/command/Command";
import { CommandBus } from "@core/Shared/domain/bus/command/CommandBus";
import { CommandHandler } from "@core/Shared/domain/bus/command/CommandHandler";
import { HandlerNotFoundError } from "@core/Shared/domain/bus/error/HandlerNotFoundError";
import { injectAll, singleton } from "tsyringe";

@singleton()
export class SyncCommandBus implements CommandBus {
  private readonly handlersMap: Map<
    new (...args: any[]) => Command,
    CommandHandler<Command>
  >;

  constructor(
    @injectAll("CommandHandler") handlers: CommandHandler<Command>[],
  ) {
    this.handlersMap = new Map();

    handlers.forEach((handler) =>
      this.handlersMap.set(handler.supports(), handler),
    );
  }

  async dispatch(command: Command): Promise<void> {
    const handler = this.handlersMap.get(
      command.constructor as new (...args: any[]) => Command,
    );
    if (!handler) {
      throw HandlerNotFoundError.byMessage(command);
    }

    await handler.handle(command);
  }
}
