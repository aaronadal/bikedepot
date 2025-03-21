import { Event, type EventBody } from "@core/Shared/domain/bus/event/Event";

export type CustomerNameChangedBody = {
  readonly entityId: string;
  readonly name: string;
};

export class CustomerNameChanged extends Event {
  static readonly EVENT_NAME = "shop.customer.name_changed";

  readonly name: string;

  constructor({
    eventId,
    eventWhen,
    entityId,
    name,
  }: Partial<EventBody> & CustomerNameChangedBody) {
    super(CustomerNameChanged.EVENT_NAME, entityId, eventId, eventWhen);

    this.name = name;
  }

  toPrimitives(): EventBody & CustomerNameChangedBody {
    return {
      eventId: this.eventId,
      eventWhen: this.eventWhen,
      entityId: this.entityId,
      name: this.name,
    };
  }
}
