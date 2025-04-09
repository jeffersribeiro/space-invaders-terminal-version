import { GameObject } from "./game_object";

export class DrawableModel extends GameObject {
  private spriteSheet: HTMLImageElement = new Image();
  private isLoaded: boolean = false;
  constructor(
    private readonly src: string,
    private readonly spriteWidth: number,
    private readonly spriteHeight: number,
    private readonly targetWidth: number,
    private readonly targetHeight: number,
    private readonly numFrames: number,
    private readonly spriteYPosition: number,
    private readonly inverted: boolean = false
  ) {
    super();
    this.spriteSheet.src = this.src;
    this.spriteSheet.onload = () => {
      this.isLoaded = true;
    };
  }

  public render(ctx: CanvasRenderingContext2D): void {
    if (!this.isLoaded) {
      return;
    }

    const frameWidth = this.spriteWidth;
    const frameHeight = this.spriteHeight;

    for (let i = 0; i < this.numFrames; i++) {
      const x = i * frameWidth;
      const y = this.spriteYPosition * frameHeight;

      const renderX = this.position.x;
      const renderY = this.position.y;

      if (this.inverted) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(
          this.spriteSheet,
          x,
          y,
          frameWidth,
          frameHeight,
          -renderX - this.targetWidth,
          renderY,
          this.targetWidth,
          this.targetHeight
        );
        ctx.restore();
      } else {
        ctx.drawImage(
          this.spriteSheet,
          x,
          y,
          frameWidth,
          frameHeight,
          renderX,
          renderY,
          this.targetWidth,
          this.targetHeight
        );
      }
    }
  }
}
