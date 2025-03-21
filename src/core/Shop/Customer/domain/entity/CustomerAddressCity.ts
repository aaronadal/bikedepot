import { StringValueObject } from "@core/Shared/domain/entity/StringValueObject";

export class CustomerAddressCity extends StringValueObject {
  private static ALLOWS_EMPTY = false;
  private static MAX_LENGTH = 50;

  public static fromValue(value: string): CustomerAddressCity {
    return new CustomerAddressCity(value);
  }

  protected constructor(value: string) {
    super(
      value,
      CustomerAddressCity.ALLOWS_EMPTY,
      CustomerAddressCity.MAX_LENGTH,
    );
  }
}
