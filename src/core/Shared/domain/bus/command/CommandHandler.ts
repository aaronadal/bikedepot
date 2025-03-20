import { Command } from './Command';

export interface CommandHandler<T extends Command> {
  supports(): Function;
  handle(command: T): Promise<void>;
}
