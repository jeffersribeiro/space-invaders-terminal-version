import { AnimationModel } from "@/entities";
import walkSoldier from "@/assets/sprites/characters/Soldier/Soldier/Soldier-Walk.png";

export class SoldierWalkAnimation extends AnimationModel {
  constructor() {
    super("walk", walkSoldier, 60, 60, 8);
  }
}
