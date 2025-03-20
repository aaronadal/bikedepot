import { InvalidArgumentError } from "../error/InvalidArgumentError";
import { ValueObject } from "./ValueObject";

export abstract class StringValueObject extends ValueObject<string> {
  protected constructor(
    value: string,
    private readonly allowsEmpty: boolean,
    private readonly maxLength: number,
  ) {
    super(value)
  }

  protected ensureIsValid(value: string): string {
    value = value.trim();
    if(value === '' && !this.allowsEmpty) {
      throw new InvalidArgumentError(`<${this.constructor.name}> requires a non-empty string, <${value}> provided`);
    }
    
    if (value.length > this.maxLength) {
      throw new InvalidArgumentError(`<${this.constructor.name}> address cannot be longer than ${this.maxLength} characters, <${value.length}> provided`);
    }

    return value;
  }
}
