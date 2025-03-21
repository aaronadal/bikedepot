import { CustomerName } from "@core/Shop/Customer/domain/entity/CustomerName";
import { WordMother } from "../../../../Shared/domain/WordMother";

export class CustomerNameMother {
  static random(): CustomerName {
    return CustomerName.fromValue(WordMother.random());
  }

  static different(reference: CustomerName): CustomerName {
    let different: CustomerName;

    do {
      different = CustomerNameMother.random();
    } while (reference.equals(different));

    return different;
  }
}
