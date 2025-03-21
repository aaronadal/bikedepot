import { Event, type EventBody } from "@core/Shared/domain/bus/event/Event";

export type CustomerCreditChangedBody = {
  readonly entityId: string;
  readonly credit: number;
};

export class CustomerCreditChanged extends Event {
  static readonly EVENT_NAME = "shop.customer.credit_changed";

  readonly credit: number;

  constructor({
    eventId,
    eventWhen,
    entityId,
    credit,
  }: Partial<EventBody> & CustomerCreditChangedBody) {
    super(CustomerCreditChanged.EVENT_NAME, entityId, eventId, eventWhen);

    this.credit = credit;
  }

  toPrimitives(): EventBody & CustomerCreditChangedBody {
    return {
      eventId: this.eventId,
      eventWhen: this.eventWhen,
      entityId: this.entityId,
      credit: this.credit,
    };
  }
}
