import { Event } from '@core/Shared/domain/bus/event/Event';
import { EventBus } from '@core/Shared/domain/bus/event/EventBus';
import { singleton } from 'tsyringe';

@singleton()
export class TestEventBus implements EventBus {
    readonly calls: Event[][] = [];

    async publish(events: Event[]): Promise<void> {
        this.calls.push(events)
    }

    static getEventsData(events: Event[]): any[] {
        return events.map((event) => {
            const { eventId, eventWhen, ...data } = event

            return data;
        });
    }
}
