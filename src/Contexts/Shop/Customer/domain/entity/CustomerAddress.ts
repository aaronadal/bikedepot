import { CustomerAddressAddress } from "./CustomerAddressAddress";
import { CustomerAddressCity } from "./CustomerAddressCity";
import { CustomerAddressPostalCode } from "./CustomerAddressPostalCode";

export class CustomerAddress {
  static create(
    address: CustomerAddressAddress,
    city: CustomerAddressCity,
    postalCode: CustomerAddressPostalCode,
  ): CustomerAddress {
    return new CustomerAddress(address, city, postalCode);
  }

  constructor(
    private readonly _address: CustomerAddressAddress,
    private readonly _city: CustomerAddressCity,
    private readonly _postalCode: CustomerAddressPostalCode,
  ) {
  }

  get address(): CustomerAddressAddress {
    return this._address
  }

  get city(): CustomerAddressCity {
    return this._city
  }

  get postalCode(): CustomerAddressPostalCode {
    return this._postalCode
  }
}
