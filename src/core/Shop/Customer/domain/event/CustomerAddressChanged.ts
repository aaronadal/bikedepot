import { Event, type EventBody } from "@core/Shared/domain/bus/event/Event";

export type CustomerAddressChangedBody = {
  readonly entityId: string;
  readonly address: string;
  readonly city: string;
  readonly postalCode: string;
};

export class CustomerAddressChanged extends Event {
  static readonly EVENT_NAME = "shop.customer.addres_changed";

  readonly address: string;
  readonly city: string;
  readonly postalCode: string;

  constructor({
    eventId,
    eventWhen,
    entityId,
    address,
    city,
    postalCode,
  }: Partial<EventBody> & CustomerAddressChangedBody) {
    super(CustomerAddressChanged.EVENT_NAME, entityId, eventId, eventWhen);

    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
  }

  toPrimitives(): EventBody & CustomerAddressChangedBody {
    return {
      eventId: this.eventId,
      eventWhen: this.eventWhen,
      entityId: this.entityId,
      address: this.address,
      city: this.city,
      postalCode: this.postalCode,
    };
  }
}
