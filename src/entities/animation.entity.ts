import { CharacterModel } from "./character.entity";

export class AnimationModel {
  private animation: HTMLImageElement[] = [];
  private currentFrameIndex: number = 0;

  constructor(
    private name: string,
    private src: string,
    private spriteWidth: number,
    private spriteHeight: number,
    numFrames: number,
    private char: CharacterModel
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
        const imageWidth = 0;
        const imageHeight = 0;

        const targetWidth = this.char.width;
        const targetHeight = this.char.height;

        for (let i = 0; i < numFrames; i++) {
          const x = i * frameWidth;
          const y = 0;

          canvas.width = targetWidth;
          canvas.height = targetHeight;

          ctx.clearRect(0, 0, targetWidth, targetHeight);

          ctx.drawImage(
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

          ctx.strokeStyle = "black";
          ctx.lineWidth = 1;
          ctx.strokeRect(0, 0, targetWidth, targetHeight);

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
