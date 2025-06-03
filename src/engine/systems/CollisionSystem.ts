import { SizeComponent, TransformComponent } from "../components";
import { System } from "../core";
import { EntityManager } from "../managers";

export class CollisionSystem extends System {
  update(em: EntityManager, dt: number) {
    // 1) Get all entities that have both Transform + Collider
    const all = em.queryEntities([TransformComponent, SizeComponent]);

    // 2) Clear their collision lists
    all.forEach((e) => (e.getComponent(SizeComponent)!.collidingWith = []));

    // 3) Test every pair
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        const A = all[i],
          B = all[j];
        const tA = A.getComponent(TransformComponent)!;
        const cA = A.getComponent(SizeComponent)!;
        const tB = B.getComponent(TransformComponent)!;
        const cB = B.getComponent(SizeComponent)!;

        const overlapX = tA.x < tB.x + cB.width && tA.x + cA.width > tB.x;
        const overlapY = tA.y < tB.y + cB.height && tA.y + cA.height > tB.y;

        if (overlapX && overlapY) {
          cA.collidingWith.push(B);
          cB.collidingWith.push(A);
        }
      }
    }
  }
}
