import {CustomerCredit} from "@core/Shop/Customer/domain/entity/CustomerCredit";
import {IntegerMother} from "../../../../Shared/domain/IntegerMother";

export class CustomerCreditMother {
    static random(): CustomerCredit {
        return CustomerCredit.fromValue(
            IntegerMother.random()
        )
    }

    static different(reference: CustomerCredit): CustomerCredit {
        let different: CustomerCredit;

        do {
            different = CustomerCreditMother.random()
        } while(reference.equals(different));

        return different;
    }
}
