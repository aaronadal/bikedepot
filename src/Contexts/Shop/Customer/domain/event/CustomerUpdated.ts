import { Event, type EventBody } from '../../../../Shared/domain/bus/event/Event';

export type CustomerUpdatedAddressBody = {
  readonly address: string;
  readonly city: string;
  readonly postalCode: string;
};

export type CustomerUpdatedBody = {
  readonly entityId: string;
  readonly name: string;
  readonly email: string;
  readonly address: CustomerUpdatedAddressBody;
};

export class CustomerUpdated extends Event {
  static readonly EVENT_NAME = 'shop.customer.updated';

  readonly name: string;
  readonly email: string;
  readonly address: CustomerUpdatedAddressBody;

  constructor(
    {
      eventId,
      eventWhen,
      entityId,
      name,
      email,
      address,
    }: Partial<EventBody> & CustomerUpdatedBody
  ) {
    super(CustomerUpdated.EVENT_NAME, entityId, eventId, eventWhen);

    this.name = name;
    this.email = email;
    this.address = address;
  }

  toPrimitives(): EventBody & CustomerUpdatedBody {
    return {
      eventId: this.eventId,
      eventWhen: this.eventWhen,
      entityId: this.entityId,
      name: this.name,
      email: this.email,
      address: this.address,
    };
  }
}
