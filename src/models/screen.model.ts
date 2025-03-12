import { PlaneModel } from "./plane.model";
import { GenericObject } from "../shared/generic_object";

export class ScreenModel {
  name: string;
  objects: GenericObject[];

  private readonly plane: PlaneModel = new PlaneModel();

  constructor(name: string, objects: GenericObject[]) {
    this.name = name;
    this.objects = objects;
    this.plane.addObjects(objects);
    this.plane.render();
  }
}
