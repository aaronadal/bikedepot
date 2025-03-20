import { CustomerId } from "@core/Shop/Customer/domain/entity/CustomerId";

export class CustomerIdMother {
    static random(): CustomerId {
        return CustomerId.random()
    }
}
