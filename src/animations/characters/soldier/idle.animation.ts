import { AnimationModel, CharacterModel } from "@/entities";
import idleSoldier from "@/assets/sprites/characters/Soldier/Soldier/Soldier-Idle.png";

export class SolderIdleAnimation extends AnimationModel {
  constructor(char: CharacterModel) {
    super("idle", idleSoldier, 100, 100, 6, char);
  }
}
