import { System, Controller } from "@/engine/core";
import { EntityManager } from "@/engine/managers";
import { InputComponent } from "../components";

export class InputSystem extends System {
  /** Called once when the system is registered */
  init(em: EntityManager): void {
    // Set up keyboard & mouse listeners
    Controller.initialize();
  }

  /**
   * Called every frame.
   * Finds all entities with an InputComponent and drives them.
   */
  update(em: EntityManager, dt: number): void {
    // Query every entity that has an InputComponent
    const entities = em.queryEntities([InputComponent]);

    for (const entity of entities) {
      const input = entity.getComponent(InputComponent)!;
      input.update(dt);
    }
  }
}
