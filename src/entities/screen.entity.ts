import { PlaneModel } from "./plane.entity";
import { GenericObject } from "./generic_object.entity";

export class SceneModel {
  name: string;
  objects: GenericObject[];

  private readonly plane: PlaneModel;

  constructor(name: string, objects: GenericObject[]) {
    this.name = name;
    this.objects = objects;
    this.plane = new PlaneModel(name);
    this.plane.addObjects(objects);
    this.plane.render();
  }
}
