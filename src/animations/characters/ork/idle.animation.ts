import { AnimationModel, CharacterModel } from "@/entities";
import idleOrk from "@/assets/sprites/characters/Orc/Orc/Orc-Idle.png";

export class OrkIdleAnimation extends AnimationModel {
  constructor(char: CharacterModel) {
    super("idle", idleOrk, 100, 100, 6, char);
  }
}
