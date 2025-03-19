import { CustomerAddress } from "../../domain/entity/CustomerAddress";

export class CustomerAddressView {
    static fromAddress(address: CustomerAddress): CustomerAddressView {
        return new CustomerAddressView(
            address.address.value,
            address.city.value,
            address.postalCode.value,
        )
    } 

    private constructor(
        readonly address: string,
        readonly city: string,
        readonly postalCode: string,
    ) {}
}
