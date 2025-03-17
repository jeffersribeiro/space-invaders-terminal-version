import { Point } from "@/interfaces";

interface SpriteModelParams {
  src: string;
  numberOfFrames: number;
  speed: number;
}

export class SpriteModel {
  src: string;
  width: number = 64;
  height: number = 64;
  numberOfFrames: number;
  currentFrame: number = 0;
  speed: number;
  point?: Point;

  constructor(params: SpriteModelParams) {
    this.src = params.src;
    this.numberOfFrames = params.numberOfFrames;
    this.speed = params.speed;
  }

  setPosition(point: Point): void {
    this.point = point;
  }
}
