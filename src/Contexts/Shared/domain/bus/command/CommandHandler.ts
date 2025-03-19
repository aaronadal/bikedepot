import { Command } from './Command';

export interface CommandHandler<T extends Command> {
  supports(): Command;
  handle(command: T): Promise<void>;
}
