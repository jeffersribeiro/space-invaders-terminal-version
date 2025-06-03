import { System } from "@/engine/core";
import { EntityManager, SceneManager } from "@/engine/managers";

export class SceneSystem extends System {
  constructor(private sceneManager: SceneManager) {
    super();
  }

  /** Called each frame by Engine */
  update(_: EntityManager, dt: number): void {
    this.sceneManager.update(dt);
    this.sceneManager.render(dt);
  }
}
