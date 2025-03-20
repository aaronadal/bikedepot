import { StringValueObject } from '../../../../Shared/domain/entity/StringValueObject';

export class CustomerAddressPostalCode extends StringValueObject {
  private static ALLOWS_EMPTY = false;
  private static MAX_LENGTH = 10;

  public static fromValue(value: string): CustomerAddressPostalCode {
    return new CustomerAddressPostalCode(value);
  }

  protected constructor(value: string) {
    super(value, CustomerAddressPostalCode.ALLOWS_EMPTY, CustomerAddressPostalCode.MAX_LENGTH);
  }
}
