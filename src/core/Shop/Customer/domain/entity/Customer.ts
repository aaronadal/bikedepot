import { CustomerId } from './CustomerId';
import { CustomerName } from './CustomerName';
import { CustomerEmail } from './CustomerEmail';
import { CustomerAddress } from './CustomerAddress';
import { AggregateRoot } from '../../../../Shared/domain/entity/AggregateRoot';
import { CustomerCreated } from '../event/CustomerCreated';
import { CustomerCredit } from './CustomerCredit';
import { CustomerDeleted } from '../event/CustomerDeleted';
import { CustomerNameChanged } from '../event/CustomerNameChanged';
import { CustomerEmailChanged } from '../event/CustomerEmailChanged';
import { CustomerAddressChanged } from '../event/CustomerAddressChanged';
import { CustomerUpdated } from '../event/CustomerUpdated';

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
      }),
    );

    return customer;
  }

  private _updated = false;

  constructor(
    private readonly _id: CustomerId,
    private _name: CustomerName,
    private _email: CustomerEmail,
    private _address: CustomerAddress,
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

  set name(name: CustomerName) {
    if(this._name.equals(name)) {
      return;
    }

    this._name = name
    this._updated = true

    this.record(
      new CustomerNameChanged({
        entityId: this.id.value,
        name: this.name.value,
      }),
    )
  }

  get email(): CustomerEmail {
    return this._email;
  }

  set email(email: CustomerEmail) {
    if(this._email.equals(email)) {
      return;
    }

    this._email = email
    this._updated = true

    this.record(
      new CustomerEmailChanged({
        entityId: this.id.value,
        email: this.email.value,
      }),
    )
  }

  get address(): CustomerAddress {
    return this._address;
  }

  set address(address: CustomerAddress) {
    if(this._address.equals(address)) {
      return;
    }

    this._address = address
    this._updated = true

    this.record(
      new CustomerAddressChanged({
        entityId: this.id.value,
        address: this.address.address.value,
        city: this.address.city.value,
        postalCode: this.address.postalCode.value,
      }),
    )
  }

  get credit(): CustomerCredit {
    return this._credit;
  }
  
  updated() {
    if(!this._updated) {
      return
    }

    this._updated = false
    this.record(
      new CustomerUpdated({
        entityId: this.id.value,
        name: this.name.value,
        email: this.email.value,
        address: {
          address: this.address.address.value,
          city: this.address.city.value,
          postalCode: this.address.postalCode.value,
        },
      }),
    )
  }
  
  deleted() {
    this.record(
      new CustomerDeleted({
        entityId: this.id.value,
      }),
    )
  }
}
