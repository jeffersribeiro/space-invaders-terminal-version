import { GenericObject } from "../shared/generic_object";

export class CharacterModel extends GenericObject {
  health: number = 100;
  mana: number = 100;

  constructor(model: string) {
    super(model);
  }
}
