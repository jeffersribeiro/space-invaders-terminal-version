import { TransformComponent } from "@/components/TransformComponent";
import { SpriteComponent } from "@/components/SpriteComponent";
import { EntityManager } from "./EntityMananger";

export class RenderSystem {
  private lastTime = performance.now();

  constructor(
    private ctx: CanvasRenderingContext2D,
    private entities: EntityManager
  ) {}

  start() {
    const loop = (now: number) => {
      const dt = now - this.lastTime;
      this.lastTime = now;

      this.update(dt);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /** Called every frame with milliseconds since last call */
  private update(dt: number) {
    // 1) Clear the whole canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // 2) Update all entities (calls component.update(dt))
    for (const entity of this.entities.getEntities()) {
      entity.update(dt);
    }

    // 3) Render only those with Transform + Sprite
    const renderables = this.entities.queryEntities([
      TransformComponent,
      SpriteComponent,
    ]);

    for (const entity of renderables) {
      const s = entity.getComponent(SpriteComponent)!;
      s.render(this.ctx);
    }
  }
}
