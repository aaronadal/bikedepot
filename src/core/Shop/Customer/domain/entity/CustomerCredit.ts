import { PositiveNumberValueObject } from "@core/Shared/domain/entity/PositiveNumberValueObject";

export class CustomerCredit extends PositiveNumberValueObject {
  public static fromValue(value: number): CustomerCredit {
    return new CustomerCredit(value);
  }

  public static createEmpty(): CustomerCredit {
    return new CustomerCredit(0);
  }
}
