import { Camera, System } from "@/engine/core";
import { EntityManager } from "@/engine/managers";
import { TransformComponent, SpriteComponent } from "../components";

export class RenderSystem extends System {
  constructor(private em: EntityManager, private camera: Camera) {
    super();
  }

  update(_: EntityManager, dt: number): void {
    // 1) Find all renderable entities
    const drawables = this.em.queryEntities([
      TransformComponent,
      SpriteComponent,
    ]);

    // 2) For each, emit a draw command
    for (const ent of drawables) {
      const t = ent.getComponent(TransformComponent)!;
      const s = ent.getComponent(SpriteComponent)!;

      s.update(dt);

      // this.camera.follow(t.y, t.x);
    }
  }
}
