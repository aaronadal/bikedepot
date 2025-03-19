import { Customer } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/Customer";
import { CustomerAddress } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerAddress";
import { CustomerAddressAddress } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerAddressAddress";
import { CustomerAddressCity } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerAddressCity";
import { CustomerAddressPostalCode } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerAddressPostalCode";
import { CustomerCredit } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerCredit";
import { CustomerEmail } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerEmail";
import { CustomerId } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerId";
import { CustomerName } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerName";
import { CustomerAddressAddressMother } from "./CustomerAddressAddressMother";
import { CustomerAddressCityMother } from "./CustomerAddressCityMother";
import { CustomerAddressMother } from "./CustomerAddressMother";
import { CustomerAddressPostalCodeMother } from "./CustomerAddressPostalCodeMother";
import { CustomerCreditMother } from "./CustomerCreditMother";
import { CustomerEmailMother } from "./CustomerEmailMother";
import { CustomerIdMother } from "./CustomerIdMother";
import { CustomerNameMother } from "./CustomerNameMother";

type CreateArgs = {
    id?: CustomerId,
    name?: CustomerName,
    email?: CustomerEmail,
    address?: CustomerAddress,
    credit?: CustomerCredit,
}

export class CustomerMother {
    static create({ id, name, email, address, credit }: CreateArgs = {}): Customer {
        return new Customer(
            id || CustomerIdMother.random(),
            name || CustomerNameMother.random(),
            email || CustomerEmailMother.random(),
            address || CustomerAddressMother.create(),
            credit || CustomerCreditMother.random(),
        )
    }
}
