import { GenericObject } from "./generic_object.entity";

export class CharacterModel extends GenericObject {
  constructor() {
    super();
  }

  getChar(): CharacterModel {
    return this;
  }
}
