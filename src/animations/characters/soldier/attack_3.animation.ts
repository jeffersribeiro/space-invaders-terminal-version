import { AnimationModel, CharacterModel } from "@/entities";
import attackSoldier from "@/assets/sprites/characters/Soldier/Soldier/Soldier-Attack03.png";

export class SoldierAttack3Animation extends AnimationModel {
  constructor(char: CharacterModel) {
    super("attack03", attackSoldier, 100, 100, 6, char);
  }
}
