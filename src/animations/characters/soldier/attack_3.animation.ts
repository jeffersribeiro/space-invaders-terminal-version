import { AnimationModel } from "@/entities";
import attackSoldier from "@/assets/sprites/characters/Soldier/Soldier/Soldier-Attack03.png";

export class SoldierAttack3Animation extends AnimationModel {
  constructor() {
    super("attack03", attackSoldier, 60, 60, 6);
  }
}
