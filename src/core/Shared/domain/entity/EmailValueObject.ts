import { InvalidArgumentError } from "../error/InvalidArgumentError";
import { StringValueObject } from "./StringValueObject";

export abstract class EmailValueObject extends StringValueObject {
  private static REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  private static ALLOWS_EMPTY = false;
  private static MAX_LENGTH = 255;

  protected constructor(value: string) {
    super(value, EmailValueObject.ALLOWS_EMPTY, EmailValueObject.MAX_LENGTH);
  }

  protected ensureIsValid(value: string): string {
    value = super.ensureIsValid(value);

    if (!EmailValueObject.REGEX.test(value)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> requires a valid email string, <${value}> provided`,
      );
    }

    return value;
  }
}
