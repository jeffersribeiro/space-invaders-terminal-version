export class AnimationModel {
  private animation: HTMLImageElement[] = [];
  private currentFrameIndex: number = 0;

  constructor(
    private name: string,
    private src: string,
    private spriteWidth: number,
    private spriteHeight: number,
    private numFrames: number
  ) {
    this.name = name;
    this.load(numFrames);
  }

  private load(numFrames: number): void {
    const frames: HTMLImageElement[] = [];
    const spriteSheet = new Image();
    spriteSheet.src = this.src;
    spriteSheet.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const frameWidth = 100;
        const frameHeight = 100;

        for (let i = 0; i < numFrames; i++) {
          const x = i * frameWidth;
          const y = 0;

          canvas.width = frameWidth;
          canvas.height = frameHeight;

          ctx.clearRect(0, 0, frameWidth, frameHeight);

          ctx.drawImage(
            spriteSheet,
            x,
            y,
            frameWidth,
            frameHeight,
            0,
            0,
            frameWidth,
            frameHeight
          );

          const frame = new Image();
          frame.src = canvas.toDataURL();
          frames.push(frame);
        }

        this.animation = frames;
      }
    };
  }

  public getName(): string {
    return this.name;
  }

  public getAnimation(): HTMLImageElement | undefined {
    const frames = this.animation;

    if (frames) {
      this.currentFrameIndex = (this.currentFrameIndex + 1) % frames.length;
      const frame = frames[this.currentFrameIndex];

      return frame;
    }
  }
}
