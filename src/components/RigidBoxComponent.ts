import { Component } from "@/core";
import { ColliderComponent } from "./ColliderComponent";
import { SizeComponent } from "./SizeComponent";
import { TransformComponent } from "./TransformComponent";
import { PhysicsComponent } from "./PhysicsComponent";

export class RigidBox extends Component {
  private position!: TransformComponent;
  private collider!: ColliderComponent;
  private physics!: PhysicsComponent;
  private size!: SizeComponent;

  start(): void {
    const transformComponent = this.entity.getComponent(TransformComponent);
    const colliderComponent = this.entity.getComponent(ColliderComponent);
    const physicsComponent = this.entity.getComponent(PhysicsComponent);
    const sizeComponent = this.entity.getComponent(SizeComponent);

    this.position = transformComponent;
    this.collider = colliderComponent;
    this.physics = physicsComponent;
    this.size = sizeComponent;
  }

  public rigidBox() {
    this.collider.colliding.forEach((object) => {
      const size = object.getComponent(SizeComponent);
      const position = object.getComponent(TransformComponent);

      const weightDifference = this.size.weight < size.weight;

      if (
        this.position.x + size.width > position.x &&
        this.position.x < position.x
      ) {
        if (this.position.x + size.width > position.x && weightDifference) {
          this.position.x = position.x - size.width;
        }
      } else if (
        this.position.x < position.x + size.width &&
        this.position.x + size.width > position.x + size.width
      ) {
        if (this.position.x < position.x + size.width && weightDifference) {
          this.position.x = position.x + size.width;
        }
      }

      if (
        this.position.y + size.height > position.y &&
        this.position.y < position.y
      ) {
        if (this.position.y + size.height > position.y && weightDifference) {
          this.position.y = position.y - size.height;
          this.physics.velocityY = 0;
        }
      } else if (
        this.position.y < position.y + size.height &&
        this.position.y + size.height > position.y + size.height
      ) {
        if (this.position.y < position.y + size.height && weightDifference) {
          this.position.y = position.y + size.height;
        }
      }
    });
  }
}
