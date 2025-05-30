import { CriteriaOrder } from "@core/Shared/domain/persistence/Criteria";
import { Query } from "@core/Shared/domain/bus/query/Query";
import { CustomerView } from "../view/CustomerView";
import { CustomerOrderByFields } from "../../domain/persistence/CustomerRepository";

export class AllCustomersQuery implements Query<CustomerView[]> {
  constructor(readonly orderBy?: CriteriaOrder<CustomerOrderByFields>) {}
}
