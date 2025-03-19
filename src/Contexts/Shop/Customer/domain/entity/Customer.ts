import { CustomerId } from './CustomerId';
import { CustomerName } from './CustomerName';
import { CustomerEmail } from './CustomerEmail';
import { CustomerAddress } from './CustomerAddress';
import { AggregateRoot } from '../../../../Shared/domain/entity/AggregateRoot';
import { CustomerCreated } from '../event/CustomerCreated';
import { CustomerCredit } from './CustomerCredit';
import { CustomerDeleted } from '../event/CustomerDeleted';

export class Customer extends AggregateRoot {
  static create(
    id: CustomerId,
    name: CustomerName,
    email: CustomerEmail,
    address: CustomerAddress,
  ): Customer {
    const credit = CustomerCredit.empty()
    const customer = new Customer(id, name, email, address, credit);

    customer.record(
      new CustomerCreated({
        entityId: id.value,
        name: name.value,
        email: email.value,
        address: {
          address: address.address.value,
          city: address.city.value,
          postalCode: address.postalCode.value,
        },
        credit: credit.value,
      }),
    );

    return customer;
  }

  constructor(
    private readonly _id: CustomerId,
    private readonly _name: CustomerName,
    private readonly _email: CustomerEmail,
    private readonly _address: CustomerAddress,
    private readonly _credit: CustomerCredit,
  ) {
    super();
  }

  get id(): CustomerId {
    return this._id;
  }

  get name(): CustomerName {
    return this._name;
  }

  get email(): CustomerEmail {
    return this._email;
  }

  get address(): CustomerAddress {
    return this._address;
  }

  get credit(): CustomerCredit {
    return this._credit;
  }
  
  deleted() {
    this.record(
      new CustomerDeleted({
        entityId: this.id.value,
      }),
    )
  }
}
