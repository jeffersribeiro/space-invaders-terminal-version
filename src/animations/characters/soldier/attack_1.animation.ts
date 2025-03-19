import { AnimationModel, CharacterModel } from "@/entities";
import attackSoldier from "@/assets/sprites/characters/Soldier/Soldier/Soldier-Attack01.png";

export class SoldierAttack1Animation extends AnimationModel {
  constructor(char: CharacterModel) {
    super("attack01", attackSoldier, 100, 100, 6, char);
  }
}
