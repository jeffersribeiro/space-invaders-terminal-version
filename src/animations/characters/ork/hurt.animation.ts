import { AnimationModel, CharacterModel } from "@/entities";
import hurtOrk from "@/assets/sprites/characters/Orc/Orc/Orc-Hurt.png";

export class OrkHurtAnimation extends AnimationModel {
  constructor(char: CharacterModel) {
    super("hurt", hurtOrk, 100, 100, 6, char);
  }
}
