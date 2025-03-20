import { v4 as uuidv4 } from 'uuid';
import { InvalidArgumentError } from '../error/InvalidArgumentError';
import { ValueObject } from './ValueObject';

export class UuidValueObject extends ValueObject<string> {
  static randomUuid(): string {
    return uuidv4();
  }

  protected ensureIsValid(value: string): string {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> requiers an UUID value, <${value}> provided`);
    }

    return value
  }
}
