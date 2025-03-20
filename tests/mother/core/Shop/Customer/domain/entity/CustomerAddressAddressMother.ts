import { CustomerAddressAddress } from "@core/Shop/Customer/domain/entity/CustomerAddressAddress";
import { WordMother } from "../../../../Shared/domain/WordMother";

export class CustomerAddressAddressMother {
    static random(): CustomerAddressAddress {
        return CustomerAddressAddress.fromValue(
            WordMother.random()
        )
    }

    static different(reference: CustomerAddressAddress): CustomerAddressAddress {
        let different: CustomerAddressAddress;

        do {
            different = CustomerAddressAddressMother.random()
        } while(reference.equals(different));

        return different;
    }
}
