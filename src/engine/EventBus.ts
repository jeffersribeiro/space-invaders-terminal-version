// src/core/EventBus.ts

type Handler<Payload> = (payload: Payload) => void;

interface QueuedEvent {
  type: string;
  payload: any;
}

class EventBus {
  private queue: QueuedEvent[] = [];
  private subscribers: Map<string, Handler<any>[]> = new Map();

  /** Subscribe to an event type */
  on<Payload>(type: string, handler: Handler<Payload>) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, []);
    }
    this.subscribers.get(type)!.push(handler);
  }

  /** Unsubscribe */
  off<Payload>(type: string, handler: Handler<Payload>) {
    const handlers = this.subscribers.get(type);
    if (handlers) {
      this.subscribers.set(
        type,
        handlers.filter((h) => h !== handler)
      );
    }
  }

  /** Queue up an event to dispatch on next flush */
  emit<Payload>(type: string, payload: Payload) {
    this.queue.push({ type, payload });
  }

  /** Immediately dispatch all queued events */
  flush() {
    while (this.queue.length) {
      const { type, payload } = this.queue.shift()!;
      const handlers = this.subscribers.get(type) || [];
      for (const h of handlers) {
        h(payload);
      }
    }
  }
}

export const eventBus = new EventBus();
