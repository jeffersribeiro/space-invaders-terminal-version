import { GenericObject, SceneModel } from "@/entities";
import { OrkCharacter } from "@/models/characters/ork.character";
import { SoldierCharacter } from "@/models/characters/soldier.character";

class WorldScene extends SceneModel {
  constructor(objects: GenericObject[]) {
    super("world", objects);
  }
}

const soldierChar = new SoldierCharacter();
const orkChar = new OrkCharacter();

export default () => new WorldScene([soldierChar, orkChar]);
