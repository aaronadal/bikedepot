import { Event, type EventBody } from '../../../../Shared/domain/bus/event/Event';

export type CustomerCreatedAddressBody = {
  readonly address: string;
  readonly city: string;
  readonly postalCode: string;
};

export type CustomerCreatedBody = {
  readonly entityId: string;
  readonly name: string;
  readonly email: string;
  readonly address: CustomerCreatedAddressBody;
  readonly credit: number;
};

export class CustomerCreated extends Event {
  static readonly EVENT_NAME = 'shop.customer.created';

  readonly name: string;
  readonly email: string;
  readonly address: CustomerCreatedAddressBody;
  readonly credit: number;

  constructor(
    {
      eventId,
      eventWhen,
      entityId,
      name,
      email,
      address,
      credit,
    }: Partial<EventBody> & CustomerCreatedBody
  ) {
    super(CustomerCreated.EVENT_NAME, entityId, eventId, eventWhen);

    this.name = name;
    this.email = email;
    this.address = address;
    this.credit = credit;
  }

  toPrimitives(): EventBody & CustomerCreatedBody {
    return {
      eventId: this.eventId,
      eventWhen: this.eventWhen,
      entityId: this.entityId,
      name: this.name,
      email: this.email,
      address: this.address,
      credit: this.credit,
    };
  }
}
