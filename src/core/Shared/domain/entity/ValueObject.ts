export abstract class ValueObject<T> {
  public readonly value: T;

  protected constructor(value: T) {
    this.value = this.ensureIsValid(value);
  }

  protected abstract ensureIsValid(value: T): T;

  equals(other: ValueObject<any>): boolean {
    return this.constructor === other.constructor && this.value === other.value;
  }

  toString(): string {
    return `${this.value}`;
  }
}
