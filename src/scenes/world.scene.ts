import { GenericObject, SceneModel } from "@/entities";
import { OrkCharacter } from "@/models/characters/ork.character";
import { SoldierCharacter } from "@/models/characters/soldier.character";
import { PlatformObject } from "@/models/objects";

class WorldScene extends SceneModel {
  constructor(objects: GenericObject[]) {
    super("world", objects);
  }
}

const soldierChar = new SoldierCharacter();
const orkChar = new OrkCharacter();
const platform1 = new PlatformObject("floor", { x: 0, y: 750 }, 7000, 5, 1000);

export default () => new WorldScene([soldierChar, orkChar, platform1]);
