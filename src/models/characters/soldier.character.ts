import {
  SolderIdleAnimation,
  SoldierWalkAnimation,
  SoldierAttack1Animation,
  SoldierAttack2Animation,
  SoldierAttack3Animation,
} from "@/animations/characters/soldier";

import { CharacterModel } from "@/entities";
import { OBJECT_TYPE } from "@/enums";
import { HealthBarUIComponent } from "@/ui/components/health_bar.ui_component";

export class SoldierCharacter extends CharacterModel {
  constructor() {
    super();
    super.attachAnimations([
      new SolderIdleAnimation(super.getChar()),
      new SoldierWalkAnimation(super.getChar()),
      new SoldierAttack1Animation(super.getChar()),
      new SoldierAttack2Animation(super.getChar()),
      new SoldierAttack3Animation(super.getChar()),
    ]);

    super.attachComponents([new HealthBarUIComponent(super.getChar())]);
    this.isPlayer = true;
    this.type = OBJECT_TYPE.PLAYER;
  }
}
