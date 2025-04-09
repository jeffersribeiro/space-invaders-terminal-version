import "@/scenes/world/objects";

import { GameObject, SceneModel } from "@/core";
import { objectsToRender } from "@/states/game.state";

class WorldScene extends SceneModel {
  constructor(objects: GameObject[]) {
    super("world", objects);
  }
}

export default () => {
  return new WorldScene(objectsToRender);
};
