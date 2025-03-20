import { Event } from '@core/Shared/domain/bus/event/Event';
import { EventBus } from '@core/Shared/domain/bus/event/EventBus';
import { singleton } from 'tsyringe';

@singleton()
export class NoopEventBus implements EventBus {
    async publish(events: Event[]): Promise<void> {
        const names = events.map((e) => e.eventName);

        console.log(`Published ${names.length} events:\n    ${names.join('\n    ')}`)
    }
}
