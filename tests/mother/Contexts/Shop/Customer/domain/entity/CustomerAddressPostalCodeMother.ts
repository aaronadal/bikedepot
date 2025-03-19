import { CustomerAddressPostalCode } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerAddressPostalCode";
import { IntegerMother } from "../../../../Shared/domain/IntegerMother";

export class CustomerAddressPostalCodeMother {
    static random(): CustomerAddressPostalCode {
        return CustomerAddressPostalCode.fromValue(
            `${IntegerMother.random()}`
        )
    }

    static different(reference: CustomerAddressPostalCode): CustomerAddressPostalCode {
        let different: CustomerAddressPostalCode;

        do {
            different = CustomerAddressPostalCodeMother.random()
        } while(reference.equals(different));

        return different;
    }
}
