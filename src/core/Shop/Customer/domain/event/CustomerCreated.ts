import { Event, type EventBody } from "@core/Shared/domain/bus/event/Event";

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
};

export class CustomerCreated extends Event {
  static readonly EVENT_NAME = "shop.customer.created";

  readonly name: string;
  readonly email: string;
  readonly address: CustomerCreatedAddressBody;

  constructor({
    eventId,
    eventWhen,
    entityId,
    name,
    email,
    address,
  }: Partial<EventBody> & CustomerCreatedBody) {
    super(CustomerCreated.EVENT_NAME, entityId, eventId, eventWhen);

    this.name = name;
    this.email = email;
    this.address = address;
  }

  toPrimitives(): EventBody & CustomerCreatedBody {
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
