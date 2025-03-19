import { CustomerId } from "../../../../../../../src/Contexts/Shop/Customer/domain/entity/CustomerId";

export class CustomerIdMother {
    static random(): CustomerId {
        return CustomerId.random()
    }
}
