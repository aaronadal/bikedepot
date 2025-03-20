import { Event } from './Event';

export interface EventBus {
  publish(events: Event[]): Promise<void>;
}
