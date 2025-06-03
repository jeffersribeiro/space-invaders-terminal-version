import { EntityManager } from "../managers";

export abstract class System {
  /** Called once when you add this system (optional) */
  init?(em: EntityManager): void;

  /** Called every frame: em = all entities, dt = ms since last frame */
  abstract update(em: EntityManager, dt: number): void;

  /** Called once when you remove this system (optional) */
  destroy?(): void;
}
