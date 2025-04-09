import { GameObject } from "./game_object";

export class AnimationModel {
  private frames: HTMLImageElement[] = [];
  private currentFrameIndex: number = 0;
  animationInterval: any = null;
  lastTime: number = 0;
  frameRate = 100;
  private numFrames: number = 0;
  private name: string;
  private readonly canvas: HTMLCanvasElement = document.createElement("canvas");
  private readonly ctx: CanvasRenderingContext2D | null;

  constructor(
    name: string,
    private src: string,
    private spriteWidth: number,
    private spriteHeight: number,
    numFrames: number,
    private char: GameObject,
    private spriteYPosition: number = 0,
    private inverted: boolean = false
  ) {
    this.numFrames = numFrames;
    this.name = name;
    this.ctx = this.canvas.getContext("2d");
    this.load();
  }

  private load(): void {
    const spriteSheet = new Image();

    const frames: HTMLImageElement[] = [];
    spriteSheet.src = this.src;

    const frameWidth = this.spriteWidth;
    const frameHeight = this.spriteHeight;

    const imageWidth = 0;
    const imageHeight = 0;

    const targetWidth = this.char.width;
    const targetHeight = this.char.height;

    this.canvas.width = targetWidth;
    this.canvas.height = targetHeight;

    spriteSheet.onload = () => {
      if (this.ctx) {
        for (let i = 0; i < this.numFrames; i++) {
          const x = i * frameWidth;
          const y = 32 * this.spriteYPosition;

          this.ctx.clearRect(0, 0, targetWidth, targetHeight);

          if (this.inverted) {
            this.ctx.save();
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
              spriteSheet,
              x,
              y,
              frameWidth,
              frameHeight,
              -targetWidth,
              0,
              targetWidth,
              targetHeight
            );
            this.ctx.restore();
          } else {
            this.ctx.drawImage(
              spriteSheet,
              x,
              y,
              frameWidth,
              frameHeight,
              imageWidth,
              imageHeight,
              targetWidth,
              targetHeight
            );
          }

          this.ctx.strokeStyle = "black";
          this.ctx.lineWidth = 1;
          this.ctx.strokeRect(0, 0, targetWidth, targetHeight);

          const frame = new Image();
          frame.src = this.canvas.toDataURL();

          frames.push(frame);
        }

        this.frames = frames;
      }
    };
  }

  startAnimation(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    this.lastTime = performance.now();
    this.animate(ctx, x, y);
  }

  stopAnimation(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  animate(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const frames = this.getFrames();

    if (frames) {
      this.currentFrameIndex = (this.currentFrameIndex + 1) % frames.length;
      const frame = frames[this.currentFrameIndex];

      ctx.drawImage(frame, x, y);
    }
  }

  public getName(): string {
    return this.name;
  }

  public getNumFrames(): number {
    return this.numFrames;
  }

  public getFrames(): HTMLImageElement[] {
    return this.frames;
  }
}
