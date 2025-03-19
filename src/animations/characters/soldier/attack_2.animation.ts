import { AnimationModel, CharacterModel } from "@/entities";
import attackSoldier from "@/assets/sprites/characters/Soldier/Soldier/Soldier-Attack02.png";

export class SoldierAttack2Animation extends AnimationModel {
  constructor(char: CharacterModel) {
    super("attack02", attackSoldier, 100, 100, 6, char);
  }
}
