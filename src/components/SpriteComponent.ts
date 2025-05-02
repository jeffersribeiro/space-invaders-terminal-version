import { Animation, Component } from "@/core";
import { TransformComponent } from "./TransformComponent";

export class SpriteComponent extends Component {
  animations: Record<string, Animation> = {};
  current: string = "idle_right";
  private transform!: TransformComponent;

  start(): void {
    const pos = this.entity.getComponent(TransformComponent);

    if (!pos) throw new Error("SpriteComponent requires TransformComponent");

    this.transform = pos;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const currentAnimation = this.animations[this.current];

    currentAnimation.startAnimation(ctx, this.transform.x, this.transform.y);
  }

  public attachAnimations(
    animations: Array<new (...args: any[]) => Animation>
  ): void {
    animations.forEach((animation) => {
      const instance = new animation();
      this.animations[instance.getName()] = instance;
    });
  }

  setCurrent(action: string): void {
    if (this.animations[action]) {
      this.current = action;
    }
  }
}
