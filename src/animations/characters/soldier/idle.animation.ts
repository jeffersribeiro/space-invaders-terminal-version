import { AnimationModel } from "@/entities";
import idleSoldier from "@/assets/sprites/characters/Soldier/Soldier/Soldier-Idle.png";

export class SolderIdleAnimation extends AnimationModel {
  constructor() {
    super("idle", idleSoldier, 100, 100, 6);
  }
}
