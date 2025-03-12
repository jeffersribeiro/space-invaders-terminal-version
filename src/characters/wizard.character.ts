import { CharacterModel } from "../models/character.model";
import wizardSprite from "../sprites/characters/wizard.sprite";

export class WizardCharacter extends CharacterModel {
  constructor() {
    super(wizardSprite);
  }
}
