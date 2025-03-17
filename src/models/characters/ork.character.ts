import { OrkIdleAnimation } from "@/animations/characters/ork";
import { CharacterModel } from "@/entities";
import { HealthBarUIComponent } from "@/ui/components/health_bar.ui_component";

export class OrkCharacter extends CharacterModel {
  constructor() {
    super();
    super.attachAnimations([new OrkIdleAnimation()]);
    super.attachComponents([new HealthBarUIComponent(super.getChar())]);
    this.position = { x: 200, y: 0 };
  }
}
