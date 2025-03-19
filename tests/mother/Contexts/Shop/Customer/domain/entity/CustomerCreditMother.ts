import { CustomerCredit } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerCredit";
import { IntegerMother } from "../../../../Shared/domain/IntegerMother";

export class CustomerCreditMother {
    static random(): CustomerCredit {
        return CustomerCredit.fromValue(
            IntegerMother.random()
        )
    }
}
