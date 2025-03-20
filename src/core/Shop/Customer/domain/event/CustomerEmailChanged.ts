import { Event, type EventBody } from '@core/Shared/domain/bus/event/Event';

export type CustomerEmailChangedBody = {
  readonly entityId: string;
  readonly email: string;
};

export class CustomerEmailChanged extends Event {
  static readonly EVENT_NAME = 'shop.customer.email_changed';

  readonly email: string;

  constructor(
    {
      eventId,
      eventWhen,
      entityId,
      email,
    }: Partial<EventBody> & CustomerEmailChangedBody
  ) {
    super(CustomerEmailChanged.EVENT_NAME, entityId, eventId, eventWhen);

    this.email = email;
  }

  toPrimitives(): EventBody & CustomerEmailChangedBody {
    return {
      eventId: this.eventId,
      eventWhen: this.eventWhen,
      entityId: this.entityId,
      email: this.email,
    };
  }
}
