import { GameObject } from "./game_object";
import { RENDER_TIME_INTERVAL } from "../constants";

export class PlaneModel {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private objects: GameObject[] = [];

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    this.canvas.width = 1400;
    this.canvas.height = 720;

    this.ctx = this.canvas.getContext("2d")!;
  }

  addObjects(objects: GameObject[]): void {
    this.objects = objects;
  }

  getObjects(): GameObject[] {
    return this.objects;
  }

  render(): void {
    setInterval(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.objects
        .sort((a, b) => a.zIndex - b.zIndex)
        .forEach((object) => {
          object.rigidBox();
          // object.applyGravity();
          object.boxCollider(this.objects);

          if (object.isPlayer) {
            object.handleGamepadInput();
          }
          object.render(this.ctx);
        });
    }, RENDER_TIME_INTERVAL);
  }
}
