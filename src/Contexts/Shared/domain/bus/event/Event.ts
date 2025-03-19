import { UuidValueObject } from "../../entity/UuidValueObject";
import { TimestampProvider } from "../../TimestampProvider";

export type EventBody = {
  eventId: string,
  eventWhen: number,
  entityId: string,
}

export abstract class Event {
  public static EVENT_NAME: string;

  public readonly eventId: string;
  public readonly eventWhen: number;

  constructor(
    public readonly eventName: string,
    public readonly entityId: string,
    eventId?: string,
    eventWhen?: number,
  ) {
    this.eventId = eventId || UuidValueObject.randomUuid()
    this.eventWhen = eventWhen || TimestampProvider.now()
  }

  abstract toPrimitives(): EventBody & Record<string, any>;
}
