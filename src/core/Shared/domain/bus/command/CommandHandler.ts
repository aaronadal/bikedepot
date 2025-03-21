import { Command } from "./Command";

export interface CommandHandler<T extends Command> {
  supports(): new (...args: any[]) => Command;
  handle(command: T): Promise<void>;
}
