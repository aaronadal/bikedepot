import { ValueObject } from "./ValueObject";

export abstract class NumberValueObject extends ValueObject<number> {
    protected ensureIsValid(value: number): number {
      return value;
    }
}
