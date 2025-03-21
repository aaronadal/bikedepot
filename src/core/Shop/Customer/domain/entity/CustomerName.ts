import { StringValueObject } from "@core/Shared/domain/entity/StringValueObject";

export class CustomerName extends StringValueObject {
  private static ALLOWS_EMPTY = false;
  private static MAX_LENGTH = 100;

  public static fromValue(value: string): CustomerName {
    return new CustomerName(value);
  }

  protected constructor(value: string) {
    super(value, CustomerName.ALLOWS_EMPTY, CustomerName.MAX_LENGTH);
  }
}
