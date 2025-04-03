import { Point } from "@/interfaces";
import { PlanePoint } from "./plane-point.entity";
import { GenericObject } from "./generic_object.entity";
import { RENDER_TIME_INTERVAL } from "../constants";

export class PlaneModel {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private objects: GenericObject[] = [];

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    this.canvas.width = 1400;
    this.canvas.height = 720;

    this.ctx = this.canvas.getContext("2d")!;
  }

  addObjects(objects: GenericObject[]): void {
    this.objects = objects;
  }

  getObjects(): GenericObject[] {
    return this.objects;
  }

  render(): void {
    requestAnimationFrame(() => {
      setInterval(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((object) => {
          object.rigidBox();
          // object.applyGravity();
          object.boxCollider(this.objects);

          if (object.isPlayer) {
            object.handleGamepadInput();
          }
          object.render(this.ctx);
        });
      }, RENDER_TIME_INTERVAL);
    });
  }
}
