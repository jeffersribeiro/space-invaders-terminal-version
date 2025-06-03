import { Entity } from "./Entity";

export class Camera {
  public x = 0;
  public y = 0;

  constructor(
    public width: number,
    public height: number,
    public worldWidth: number,
    public worldHeight: number,
    private smoothFactor = 0.1
  ) {}

  /** Only returns entities whose bounds intersect camera view */
  cull(entities: Entity[]): Entity[] {
    return entities;
  }

  follow(targetY: number, targetX: number) {
    const desiredX = targetX - this.width * 0.5;
    const desiredY = targetY - this.height * 0.5;

    this.x +=
      (this.clamp(desiredX, 0, this.worldWidth - this.width) - this.x) *
      this.smoothFactor;
    this.y +=
      (this.clamp(desiredY, 0, this.worldHeight - this.height) - this.y) *
      this.smoothFactor;
  }

  private clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
  }
}
