import { TransformComponent } from "@/engine/components";
import { SizeComponent } from "@/engine/components/SizeComponent";
import { EntityManager } from "@/engine/managers";
import { System } from "@/engine/core/System";

export class RigidBoxSystem extends System {
  /**
   * Called once per frame with the master EntityManager
   */
  update(em: EntityManager, dt: number): void {
    // 1) Find every entity that can collide
    const colliders = em.queryEntities([TransformComponent, SizeComponent]);

    // 2) For each entity, push it out of anything it's colliding with
    colliders.forEach((entity) => {
      const t = entity.getComponent(TransformComponent)!;
      const size = entity.getComponent(SizeComponent)!;

      // clear previous frame’s list if your CollisionSystem doesn’t already
      // col.colliding = [];

      // 3) For each other entity this one is colliding with:
      for (const other of size.collidingWith) {
        const oT = other.getComponent(TransformComponent)!;
        const oSize = other.getComponent(SizeComponent)!;

        // compare weights (lighter object moves)
        const iAmLighter = size.weight < oSize.weight;

        // HORIZONTAL
        if (
          t.x + size.width > oT.x && // my right > their left
          t.x < oT.x // my left < their left
        ) {
          // I’m on their left
          if (iAmLighter) {
            t.x = oT.x - size.width;
          }
        } else if (
          t.x < oT.x + oSize.width && // my left < their right
          t.x + size.width > oT.x + oSize.width
        ) {
          // I’m on their right
          if (iAmLighter) {
            t.x = oT.x + oSize.width;
          }
        }

        // VERTICAL
        if (
          t.y + size.height > oT.y && // my bottom > their top
          t.y < oT.y // my top < their top
        ) {
          // I’m above them (falling onto them)
          if (iAmLighter) {
            t.y = oT.y - size.height;
          }
        } else if (
          t.y < oT.y + oSize.height && // my top < their bottom
          t.y + size.height > oT.y + oSize.height
        ) {
          // I’m below them (pushed up)
          if (iAmLighter) {
            t.y = oT.y + oSize.height;
          }
        }
      }
    });
  }
}
