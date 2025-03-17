import { Point } from "@/interfaces";
import { GenericObject } from "./generic_object.entity";

export class PlanePoint {
  index: number;
  point: Point;
  object: GenericObject | null;

  constructor(index: number, point: Point, object?: GenericObject | null) {
    this.index = index;
    this.point = point;
    this.object = object ?? null;
  }

  hasObject(): boolean {
    return this.object !== null;
  }

  getObject(): GenericObject | null {
    return this.object;
  }
}
