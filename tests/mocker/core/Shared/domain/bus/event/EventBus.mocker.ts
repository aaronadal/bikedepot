import { Event } from "@core/Shared/domain/bus/event/Event";
import { EventBus } from "@core/Shared/domain/bus/event/EventBus";

export class EventBusMocker {
    private publishedCallsCount = 0;

    readonly mock: EventBus;

    constructor() {
        this.mock = {
            publish: jest.fn().mockResolvedValue(Promise.resolve(undefined)),
        };
    }

    assertPublished(events: Event[]): void {
        const currentCall = this.publishedCallsCount++;

        const calls = (this.mock.publish as jest.Mock).mock.calls;

        expect(calls.length).toBeGreaterThanOrEqual(currentCall + 1)

        const args = calls[currentCall]

        const expected = this.getEventsData(events)
        const actual = this.getEventsData(args[0])

        expect(actual).toMatchObject(expected)
    }

    private getEventsData(events: Event[]): any[] {
        return events.map((event) => {
            const { eventId, eventWhen, ...data } = event

            return data;
        });
    }
}
