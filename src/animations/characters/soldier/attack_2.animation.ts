import { AnimationModel } from "@/entities";
import attackSoldier from "@/assets/sprites/characters/Soldier/Soldier/Soldier-Attack02.png";

export class SoldierAttack2Animation extends AnimationModel {
  constructor() {
    super("attack02", attackSoldier, 60, 60, 6);
  }
}
