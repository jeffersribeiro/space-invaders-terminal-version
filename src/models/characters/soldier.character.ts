import {
  SolderIdleAnimation,
  SoldierWalkAnimation,
  SoldierAttack1Animation,
  SoldierAttack2Animation,
  SoldierAttack3Animation,
} from "@/animations/characters/soldier";

import { CharacterModel } from "@/entities";
import { HealthBarUIComponent } from "@/ui/components/health_bar.ui_component";

export class SoldierCharacter extends CharacterModel {
  constructor() {
    super();
    super.attachAnimations([
      new SolderIdleAnimation(),
      new SoldierWalkAnimation(),
      new SoldierAttack1Animation(),
      new SoldierAttack2Animation(),
      new SoldierAttack3Animation(),
    ]);

    super.attachComponents([new HealthBarUIComponent(super.getChar())]);
    this.isPlayer = true;
  }
}
