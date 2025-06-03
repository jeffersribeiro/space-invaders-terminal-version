import { EntityManager } from "../managers";

export interface Scene {
  /** Called once when this scene becomes active */
  init(em: EntityManager): void;

  /** Called every frame while this scene is active */
  update(em: EntityManager, dt: number): void;

  /** Called every frame after update to draw the scene */
  render(em: EntityManager, dt: number): void;

  /** Optional cleanup when switching away from this scene */
  destroy?(em: EntityManager): void;
}
