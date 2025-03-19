import { GenericObject } from "@/entities";
import { Point } from "@/interfaces";

export class PlatformObject extends GenericObject {
  name: string;

  constructor(
    name: string,
    position: Point,
    width: number,
    height: number,
    weight: number
  ) {
    super();
    this.name = name;

    this.position.x = position.x;
    this.position.y = position.y;
    this.width = width;
    this.height = height;
    this.weight = weight;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (ctx) {
      ctx.fillStyle = "green";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
}
