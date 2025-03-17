import { AnimationModel } from "@/entities";
import attackSoldier from "@/assets/sprites/characters/Soldier/Soldier/Soldier-Attack01.png";

export class SoldierAttack1Animation extends AnimationModel {
  constructor() {
    super("attack01", attackSoldier, 60, 60, 6);
  }
}
