import { StringValueObject } from '../../../../Shared/domain/entity/StringValueObject';

export class CustomerAddressAddress extends StringValueObject {
  private static ALLOWS_EMPTY = false;
  private static MAX_LENGTH = 50;

  public static fromValue(value: string): CustomerAddressAddress {
    return new CustomerAddressAddress(value);
  }

  protected constructor(value: string) {
    super(value, CustomerAddressAddress.ALLOWS_EMPTY, CustomerAddressAddress.MAX_LENGTH);
  }
}
