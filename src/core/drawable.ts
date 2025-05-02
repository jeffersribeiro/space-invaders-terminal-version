import { Entity } from "./Entity";

export class DrawableModel extends Entity {
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
  }
}
