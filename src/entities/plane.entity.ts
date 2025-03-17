import { Point } from "@/interfaces";
import { PlanePoint } from "./plane-point.entity";
import { GenericObject } from "./generic_object.entity";
import {
  RENDER_TIME_INTERVAL,
  X_SCREEN_SIZE,
  Y_SCREEN_SIZE,
} from "../constants";

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

  objectTouchedReference(
    reference: GenericObject,
    object: GenericObject
  ): boolean {
    const referencePos = reference.getPosition();
    const objectPos = object.getPosition();

    if (referencePos.x < objectPos.x && referencePos.y === objectPos.y) {
      return true;
    }

    return false;
  }

  updateObjectPosition(object: GenericObject): void {
    const index = this.findIndexByPoint(object.position);

    if (index == -1) {
      throw new Error("Invalid object position");
    }

    this.objects[index] = object;
  }

  getObjects(): GenericObject[] {
    return this.objects;
  }

  private findIndexByPoint(point: Point): number {
    const { x, y } = point;

    const index = this.objects.findIndex(
      (o) => o.position.x === x && o.position.y === y
    );

    return index;
  }

  render(): void {
    setInterval(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.objects.forEach((object) => {
        object.updateContact(this.objects);
        this.updateObjectPosition(object);

        if (object.isPlayer) {
          object.handleGamepadInput();
        }
        object.render(this.ctx, object.position.x, object.position.y);
      });
    }, RENDER_TIME_INTERVAL);
  }
}
