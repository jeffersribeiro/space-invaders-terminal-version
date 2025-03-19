import { AnimationModel, CharacterModel } from "@/entities";
import walkSoldier from "@/assets/sprites/characters/Soldier/Soldier/Soldier-Walk.png";

export class SoldierWalkAnimation extends AnimationModel {
  constructor(char: CharacterModel) {
    super("walk", walkSoldier, 100, 100, 8, char);
  }
}
