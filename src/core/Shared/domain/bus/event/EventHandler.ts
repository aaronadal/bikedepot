import { Event } from './Event';

export interface DomainEventSubscriber<T extends Event> {
  subscribedTo(): Array<{ EVENT_NAME: string }>;
  handle(domainEvent: T): Promise<void>;
}
