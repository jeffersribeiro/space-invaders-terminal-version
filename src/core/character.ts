import { GameObject } from "./game_object";

export class CharacterModel extends GameObject {
  constructor() {
    super();
  }

  getChar(): CharacterModel {
    return this;
  }
}
