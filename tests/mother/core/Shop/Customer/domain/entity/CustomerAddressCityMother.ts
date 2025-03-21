import { CustomerAddressCity } from "@core/Shop/Customer/domain/entity/CustomerAddressCity";
import { WordMother } from "../../../../Shared/domain/WordMother";

export class CustomerAddressCityMother {
  static random(): CustomerAddressCity {
    return CustomerAddressCity.fromValue(WordMother.random());
  }

  static different(reference: CustomerAddressCity): CustomerAddressCity {
    let different: CustomerAddressCity;

    do {
      different = CustomerAddressCityMother.random();
    } while (reference.equals(different));

    return different;
  }
}
