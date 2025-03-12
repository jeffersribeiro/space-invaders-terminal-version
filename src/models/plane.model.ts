import { Point } from "../interfaces";
import { PlanePoint } from "./plane-point.model";
import { GenericObject } from "../shared/generic_object";
import { X_SCREEN_SIZE, Y_SCREEN_SIZE } from "../constants";
import { GamePadModel } from "./gamepad.model";
import { GAMEPED_MAPPED_KEY } from "../enums";

export class PlaneModel {
  private readonly points: PlanePoint[] = [];
  private readonly gamepad: GamePadModel = new GamePadModel();

  constructor() {
    this.build();
  }

  private build = (): void => {
    let index = 0;
    for (let x = 0; x < X_SCREEN_SIZE; x++) {
      for (let y = 0; y < Y_SCREEN_SIZE; y++) {
        const point = { x, y };
        const planePoint = new PlanePoint(index, point);
        this.points.push(planePoint);
        index++;
      }
    }
  };

  addObjects = (objects: GenericObject[]): void => {
    for (const object of objects) {
      const index = this.findIndexByPoint(object.position);
      console.log(index);
      if (index == -1) {
        throw new Error("Invalid object position");
      }

      this.points[index].object = object;
    }
  };

  getPlane = (): PlanePoint[] => {
    return this.points;
  };

  private findIndexByPoint = (point: Point): number => {
    const { x, y } = point;

    const index = this.points.findIndex(
      (p) => p.point.x === x && p.point.y === y
    );

    return index;
  };

  render(): void {
    let drawed = "";

    setInterval(() => {
      console.log("\x1Bc");
      drawed = "";

      this.points.forEach((point, index) => {
        this.updateObjectPosition(point.object);

        if (point.object?.isPlayer) {
          point.object.move(GAMEPED_MAPPED_KEY.MOVE_RIGHT);
          // point.object.attachGamePad(this.gamepad);
        }

        drawed += point.hasObject() ? point.getObject()?.getModel() : " ";

        if ((index + 1) % X_SCREEN_SIZE === 0) {
          drawed += "\n";
        }
      });

      console.log(drawed);
    }, 1000);
  }

  updateObjectPosition(object: GenericObject | null): void {
    if (object !== null) {
      this.points.forEach((point) => {
        point.object = null;
      });

      const newPosition = object.getPosition();
      const newIndex = this.findIndexByPoint(newPosition);

      if (newIndex !== -1) {
        this.points[newIndex].object = object;
      }
    }
  }
}
