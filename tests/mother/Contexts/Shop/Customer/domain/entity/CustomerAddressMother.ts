import { CustomerAddress } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerAddress";
import { CustomerAddressAddress } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerAddressAddress";
import { CustomerAddressCity } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerAddressCity";
import { CustomerAddressPostalCode } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerAddressPostalCode";
import { CustomerAddressAddressMother } from "./CustomerAddressAddressMother";
import { CustomerAddressCityMother } from "./CustomerAddressCityMother";
import { CustomerAddressPostalCodeMother } from "./CustomerAddressPostalCodeMother";

type CreateArgs = {
    address?: CustomerAddressAddress,
    city?: CustomerAddressCity,
    postalCode?: CustomerAddressPostalCode,
}

export class CustomerAddressMother {
    static create({ address, city, postalCode }: CreateArgs = {}): CustomerAddress {
        return CustomerAddress.create(
            address || CustomerAddressAddressMother.random(),
            city || CustomerAddressCityMother.random(),
            postalCode || CustomerAddressPostalCodeMother.random(),
        )
    }
}
