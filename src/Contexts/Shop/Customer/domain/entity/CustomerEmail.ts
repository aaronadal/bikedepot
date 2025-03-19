import { EmailValueObject } from '../../../../Shared/domain/entity/EmailValueObject';

export class CustomerEmail extends EmailValueObject {
  public static fromValue(value: string): CustomerEmail {
    return new CustomerEmail(value);
  }
}
