import { PlayerWalkAnimation } from "@/animations/player";

import { CharacterModel } from "@/entities";
import { OBJECT_TYPE } from "@/enums";
import { playerState } from "@/states/player.state";
import { HealthBarUIComponent } from "@/ui/components/health_bar.ui_component";

export class PlayerCharacter extends CharacterModel {
  constructor() {
    super();
    super.attachAnimations([new PlayerWalkAnimation(super.getChar())]);

    super.attachComponents([new HealthBarUIComponent(super.getChar())]);
    this.isPlayer = true;
    this.type = OBJECT_TYPE.PLAYER;
    this.attack = null;
  }
}
