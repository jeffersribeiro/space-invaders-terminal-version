import { System } from "./core";
import { EntityManager } from "./managers";

export class Engine {
  private entityManager = new EntityManager();
  private systems: System[] = [];
  private lastTime = 0;
  private running = false;

  /**
   * Register a system into the update loop.
   * Calls its optional `init()` immediately.
   */
  registerSystem(system: System): this {
    if (system.init) {
      system.init(this.entityManager);
    }
    this.systems.push(system);
    return this;
  }

  /**
   * Kick off the requestAnimationFrame loop.
   * Each frame, computes `dt` and calls `update(em, dt)` on every system.
   */
  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();

    const loop = (now: number) => {
      if (!this.running) return;
      const dt = now - this.lastTime;
      this.lastTime = now;

      for (const sys of this.systems) {
        sys.update(this.entityManager, dt);
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  /**
   * Stops the loop and calls each system’s optional `destroy()` hook.
   */
  stop(): void {
    this.running = false;
    for (const sys of this.systems) {
      if (sys.destroy) sys.destroy();
    }
  }

  /** Expose the EntityManager if you need to query or create entities externally */
  getEntityManager(): EntityManager {
    return this.entityManager;
  }
}
