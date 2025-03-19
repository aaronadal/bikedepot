import { Query } from "../../../../Shared/domain/bus/query/Query";
import { CustomerView } from "../view/CustomerView";

export class GetCustomerQuery implements Query<CustomerView> {
    constructor(
        public readonly id: string,
    ) {}
}
