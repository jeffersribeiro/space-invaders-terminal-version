import { Scene } from "../core";
import { EntityManager } from "./EntityMananger";

export class SceneManager {
  private scenes = new Map<string, Scene>();
  private currentKey: string | null = null;
  private currentScene: Scene | null = null;
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
  }

  /** Register a scene under a string key */
  register(key: string, scene: Scene): this {
    this.scenes.set(key, scene);
    return this;
  }

  /** Switch to a different scene by key */
  load(key: string): void {
    if (this.currentScene && this.currentScene.destroy) {
      this.currentScene.destroy(this.em);
    }

    const next = this.scenes.get(key);
    if (!next) {
      throw new Error(`Scene "${key}" not found`);
    }

    this.em = new EntityManager(); // clear or reset entities if desired
    this.currentKey = key;
    this.currentScene = next;
    next.init(this.em);
  }

  /** Called each frame from your Engine */
  update(dt: number): void {
    this.currentScene?.update(this.em, dt);
  }

  /** Called each frame after update */
  render(dt: number): void {
    this.currentScene?.render(this.em, dt);
  }

  /** Retrieve the key of the active scene */
  get active(): string | null {
    return this.currentKey;
  }
}
