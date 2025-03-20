import { Event } from '../bus/event/Event';
import { UuidValueObject } from './UuidValueObject';

export abstract class AggregateRoot {
  private events: Event[] = [];

  pullEvents(): Event[] {
    const events = [...this.events];
    this.events = [];

    return events;
  }

  record(event: Event): void {
    this.events.push(event);
  }

  abstract get id(): UuidValueObject;
}
