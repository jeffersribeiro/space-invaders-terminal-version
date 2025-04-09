import { PlaneModel } from "./plane";
import { GameObject } from "./game_object";

export class SceneModel {
  name: string;
  objects: GameObject[];

  private readonly plane: PlaneModel;

  constructor(name: string, objects: GameObject[]) {
    this.name = name;
    this.objects = objects;
    this.plane = new PlaneModel(name);
    this.plane.addObjects(objects);
    this.plane.render();
  }
}
