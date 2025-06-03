import { System } from "../core";
import { eventBus } from "../EventBus";
import { EntityManager } from "../managers";

export class EventSystem extends System {
  /** Called every frame, before other systems (or after, as you prefer) */
  update(_: EntityManager, __: number) {
    eventBus.flush();
  }
}
