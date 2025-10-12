import { EventTypes } from "./allEvents"
export class EventBus<ETypes extends {}> {
        private eventSubscriptions: { [eventName in keyof ETypes]: Function[] };
        constructor() {
            this.eventSubscriptions = {} as { [eventName in keyof ETypes]: Function[] };
        }

    subscribe<T extends keyof ETypes>(eventName: T, callback: (data: ETypes[T]) => void): () => boolean {
        if (!this.eventSubscriptions[eventName]) {
            this.eventSubscriptions[eventName] = [];
        }
        this.eventSubscriptions[eventName].push(callback);
        return () => this.unsubscribe(eventName, callback);
    }

    unsubscribe<T extends keyof ETypes>(eventName: T, callback: (data: ETypes[T]) => void): boolean {
        const subscriptions = this.eventSubscriptions[eventName];
        if (subscriptions) {
            this.eventSubscriptions[eventName] = subscriptions.filter(subscription => subscription !== callback);
            return true
        }
        return false
    }

    publish<T extends keyof ETypes>(eventName: T, eventData?: ETypes[T]): void {
        const subscriptions = this.eventSubscriptions[eventName];
        if (subscriptions) {
            subscriptions.forEach(subscription => subscription(eventData));
        }
    }

    once<T extends keyof ETypes>(eventName: T): Promise<void>;
    once<T extends keyof ETypes>(eventName: T, callback: (data: ETypes[T]) => void): void;
    once<T extends keyof ETypes>(eventName: T, callback?: (data: ETypes[T]) => void) {
        if (callback) {
            const unsubscribe = this.subscribe(eventName, (data) => {
                callback(data);
                unsubscribe();
            })
        } else {
            return new Promise<void>((resolve) => {
                const unsubscribe = this.subscribe(eventName, () => {
                    unsubscribe();
                    resolve();
                })
            })
        }
    }
}

export const globalEvents = new EventBus<EventTypes>();