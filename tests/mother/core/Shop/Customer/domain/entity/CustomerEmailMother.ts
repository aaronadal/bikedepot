import { CustomerEmail } from "@core/Shop/Customer/domain/entity/CustomerEmail";
import { EmailMother } from "../../../../Shared/domain/EmailMother";

export class CustomerEmailMother {
  static random(): CustomerEmail {
    return CustomerEmail.fromValue(EmailMother.random());
  }

  static different(reference: CustomerEmail): CustomerEmail {
    let different: CustomerEmail;

    do {
      different = CustomerEmailMother.random();
    } while (reference.equals(different));

    return different;
  }
}
