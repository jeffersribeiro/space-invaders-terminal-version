// src/core/Animation.ts

export class Animation {
  private elapsedTime = 0;
  private currentFrame = 0;
  private columns: number;
  spriteSheet: CanvasImageSource;
  name: string;

  /**
   * @param name            unique key for this animation
   * @param spriteSheet     loaded HTMLImageElement (your PNG)
   * @param frameWidth      width of a single frame in px
   * @param frameHeight     height of a single frame in px
   * @param frameCount      total number of frames in this animation
   * @param fps             frames per second to play
   * @param columns?        optional: frames per row; by default inferred from sheet.width/frameWidth
   */
  constructor(
    name: string,
    spriteSheet: string,
    private spriteWidth: number,
    private spriteHeight: number,
    private targetWidth: number,
    private targetHeight: number,
    private frameCount: number,
    columns: number = 0,
    private inverted: boolean = false
  ) {
    this.spriteSheet = new Image();
    this.spriteSheet.src = spriteSheet;
    this.name = name;
    // infer columns if not provided:
    this.columns = columns ?? Math.floor(this.spriteWidth / this.targetWidth);
  }

  /** Advance the animation by dt milliseconds */
  update(dt: number) {
    this.elapsedTime += dt;
    const msPerFrame = 1000 / this.frameCount;

    while (this.elapsedTime >= msPerFrame) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
      this.elapsedTime -= msPerFrame;
    }
  }

  /** Compute and return the source rectangle for drawImage */
  getFrameRect() {
    const col = this.currentFrame % this.frameCount;
    const row = Math.floor(this.columns);
    return {
      sx: col * this.spriteWidth,
      sy: row * this.spriteHeight,
      sw: this.spriteWidth,
      sh: this.spriteHeight,
    };
  }
}
