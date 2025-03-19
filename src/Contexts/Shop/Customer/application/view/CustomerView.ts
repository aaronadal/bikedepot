import { Customer } from "../../domain/entity/Customer";
import { CustomerAddressView } from "./CustomerAddressView";

export class CustomerView {
    static fromCustomer(customer: Customer): CustomerView {
        return new CustomerView(
            customer.id.value,
            customer.name.value,
            customer.email.value,
            CustomerAddressView.fromAddress(customer.address),
            customer.credit.value,
        )
    } 

    private constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly address: CustomerAddressView,
        readonly credit: number,
    ) {
    }
}
