import { GAMEPED_MAPPED_KEY } from "../enums";
import { Point } from "../interfaces";
import { GamePadModel } from "../models/gamepad.model";

export class GenericObject {
  position: Point = { x: 100, y: 15 };
  protected readonly model: string;
  isPlayer: boolean = true;

  constructor(model: string) {
    this.model = model;
  }

  private moveUp = (): void => {
    this.position.y += 2;
  };

  private moveDown = (): void => {
    this.position.y -= 2;
  };

  private moveLeft = (): void => {
    this.position.x -= 2;
  };

  private moveRight = (): void => {
    this.position.x += 2;
  };

  move = (button: GAMEPED_MAPPED_KEY | undefined): void => {
    if (button) {
      const goTo: Record<GAMEPED_MAPPED_KEY, () => void> = {
        [GAMEPED_MAPPED_KEY.MOVE_RIGHT]: this.moveRight,
        [GAMEPED_MAPPED_KEY.MOVE_LEFT]: this.moveLeft,
        [GAMEPED_MAPPED_KEY.MOVE_UP]: this.moveUp,
        [GAMEPED_MAPPED_KEY.MOVE_DOWN]: this.moveDown,
      };

      const action = goTo[button];
      if (action) {
        action.call(this);
      }
    }
  };

  getPosition = (): Point => {
    return this.position;
  };

  getModel = (): string => {
    console.log(this.getPosition());
    return this.model;
  };

  setPosition = (x: number, y: number): void => {
    console.log(this.position);
    this.position = { x, y };
  };

  attachGamePad = (gamepad: GamePadModel): void => {
    gamepad.subscribe(this.move.bind(this));
  };
}
