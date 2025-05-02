import { Component, Entity } from "@/core";
import { TransformComponent } from "./TransformComponent";
import { SizeComponent } from "./SizeComponent";

export class ColliderComponent extends Component {
  colliding: Array<Entity> = [];

  public boxCollider(objects: Entity[]): void {
    const refPos = this.entity.getComponent(TransformComponent);
    this.colliding = [];

    objects.forEach((object) => {
      const isItself = this.entity !== object;

      const position = object.getComponent(TransformComponent);
      const size = object.getComponent(SizeComponent);

      const isPositionXMoreThanOther = refPos.x < position.x + size.width;
      const isPositionXLessThanOther = refPos.x + size.width > position.x;
      const isPositionYMoreThanOther = refPos.y + size.height > position.y;
      const isPositionYLessThanOther = refPos.y < position.y + size.height;

      if (
        isItself &&
        isPositionXMoreThanOther &&
        isPositionXLessThanOther &&
        isPositionYMoreThanOther &&
        isPositionYLessThanOther
      ) {
        this.colliding.push(object);
      }
    });
  }
}
