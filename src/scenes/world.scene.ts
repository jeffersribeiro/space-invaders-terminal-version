import { GenericObject, SceneModel } from "@/entities";

import { objectsToRender } from "@/states/game.state";

import { PlatformLevel } from "@/models/levels";
import { PlayerCharacter } from "@/models/characters/player.character";

class WorldScene extends SceneModel {
  constructor(objects: GenericObject[]) {
    super("world", objects);
  }
}

new PlayerCharacter();

const horizontal_floor0 = new PlatformLevel(
  "horizontal_floor0",
  { x: 0, y: 540 },
  740,
  5,
  200
);

const horizontal_floor1 = new PlatformLevel(
  "horizontal_floor1",
  { x: 0, y: 400 },
  300,
  5,
  200
);

const horizontal_floor2 = new PlatformLevel(
  "horizontal_floor2",
  { x: 420, y: 400 },
  300,
  5,
  200
);

const vertgical_floor3 = new PlatformLevel(
  "vertgical_floor3",
  { x: 720, y: 0 },
  5,
  700,
  200
);

horizontal_floor0.hasGravity = false;
horizontal_floor1.hasGravity = false;
horizontal_floor2.hasGravity = false;
vertgical_floor3.hasGravity = false;

export default () => {
  return new WorldScene(objectsToRender);
};
