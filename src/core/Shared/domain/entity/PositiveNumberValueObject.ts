import { InvalidArgumentError } from "../error/InvalidArgumentError";
import { NumberValueObject } from "./NumberValueObject";

export abstract class PositiveNumberValueObject extends NumberValueObject {
    protected ensureIsValid(value: number): number {
      value = super.ensureIsValid(value);

      if(value < 0) {
        throw new InvalidArgumentError  (`<${this.constructor.name}> requires a positive number, <${value}> provided`);
      }

      return value;
    }
}
