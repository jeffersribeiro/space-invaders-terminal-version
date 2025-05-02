import { Component } from "@/core";
import { TransformComponent } from "./TransformComponent";

export class PhysicsComponent extends Component {
  private transform!: TransformComponent;

  constructor(
    public velocityY: number = 0.5,
    public velocityX: number = 0,
    public hasGravity: boolean = true
  ) {
    super();
  }

  start(): void {
    const pos = this.entity.getComponent(TransformComponent);

    if (!pos) throw new Error("PhysicsComponent requires TransformComponent");

    this.transform = pos;
  }

  public applyGravity(): void {
    if (this.hasGravity) {
      if (this.velocityY < 10) {
        this.velocityX += 0.5;
      }

      this.transform.y += this.velocityY;

      if (this.transform.y > 500) {
        this.transform.y = 500;
        this.velocityY = 0;
      }
    }
  }
}
