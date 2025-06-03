import { eventBus } from "../EventBus";
import { EntityManager } from "../managers";
import { System } from "./System";

interface DrawCommand {
  image: CanvasImageSource;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dx: number;
  dy: number;
  dw: number;
  dh: number;
  inverted: boolean;
}

export class CanvasRenderer extends System {
  private ctx: CanvasRenderingContext2D;
  private queue: DrawCommand[] = [];

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.ctx = canvas.getContext("2d")!;

    // Subscribe once to enqueue every draw command
    eventBus.on<DrawCommand>("render:draw", (cmd) => {
      this.queue.push(cmd);
    });
  }

  update(_: EntityManager, __: number): void {
    // 1) Clear the canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // 2) Flush all queued commands
    for (const cmd of this.queue) {
      const { image, sx, sy, sw, sh, dx, dy, dw, dh, inverted } = cmd;
      this.ctx.save();
      if (inverted) {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(image, sx, sy, sw, sh, -dx - dw, dy, dw, dh);
      } else {
        this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
      }
      this.ctx.restore();
    }

    // 3) Reset for next frame
    this.queue.length = 0;
  }
}
