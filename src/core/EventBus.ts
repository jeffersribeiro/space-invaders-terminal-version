type EventHandler<T = any> = (payload: T) => void;

export class EventBus {
  private events: Map<string, Set<EventHandler>> = new Map();

  public on<T>(event: string, handler: EventHandler<T>): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(handler);
  }

  public off<T>(event: string, handler: EventHandler<T>): void {
    this.events.get(event)?.delete(handler);
  }

  public emit<T>(event: string, payload?: T): void {
    this.events.get(event)?.forEach((handler) => {
      handler(payload!);
    });
  }

  public clear(event: string): void {
    this.events.delete(event);
  }
}

export const eventBus = new EventBus(); // Singleton
