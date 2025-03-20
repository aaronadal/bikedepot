import { Event, type EventBody } from '@core/Shared/domain/bus/event/Event';

export type CustomerDeletedBody = {
  readonly entityId: string;
};

export class CustomerDeleted extends Event {
  static readonly EVENT_NAME = 'shop.customer.deleted';

  constructor(
    {
      eventId,
      eventWhen,
      entityId,
    }: Partial<EventBody> & CustomerDeletedBody
  ) {
    super(CustomerDeleted.EVENT_NAME, entityId, eventId, eventWhen);
  }

  toPrimitives(): EventBody & CustomerDeletedBody {
    return {
      eventId: this.eventId,
      eventWhen: this.eventWhen,
      entityId: this.entityId,
    };
  }
}
