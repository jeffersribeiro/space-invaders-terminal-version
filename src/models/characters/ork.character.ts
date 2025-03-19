import {
  OrkHurtAnimation,
  OrkIdleAnimation,
} from "@/animations/characters/ork";
import { CharacterModel } from "@/entities";
import { OBJECT_TYPE } from "@/enums";
import { HealthBarUIComponent } from "@/ui/components/health_bar.ui_component";

export class OrkCharacter extends CharacterModel {
  constructor() {
    super();
    super.attachAnimations([
      new OrkHurtAnimation(super.getChar()),
      new OrkIdleAnimation(super.getChar()),
    ]);
    super.attachComponents([new HealthBarUIComponent(super.getChar())]);
    this.position = { x: 200, y: 0 };
    this.type = OBJECT_TYPE.NPC;
  }
}
