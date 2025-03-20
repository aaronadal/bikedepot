import { UuidValueObject } from '@core/Shared/domain/entity/UuidValueObject';

export class CustomerId extends UuidValueObject {
  public static fromValue(value: string): CustomerId {
    return new CustomerId(value);
  }

  public static random(): CustomerId {
    return new CustomerId(UuidValueObject.randomUuid());
  }
}
