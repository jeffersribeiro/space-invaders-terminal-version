import {
  PlayerWalkDownAnimation,
  PlayerWalkLeftAnimation,
  PlayerWalkRightAnimation,
  PlayerWalkUpAnimation,
  PlayerIdleDownAnimation,
  PlayerIdleLeftAnimation,
  PlayerIdleRightAnimation,
  PlayerIdleUpAnimation,
  PlayerBaseAttack01DownAnimation,
  PlayerBaseAttack01LeftAnimation,
  PlayerBaseAttack01RightAnimation,
  PlayerBaseAttack01UpAnimation,
  PlayerRollDownAnimation,
  PlayerRollLeftAnimation,
  PlayerRollRightAnimation,
  PlayerRollUpAnimation,
} from "@/animations/player";

import { CharacterModel } from "@/entities";
import { OBJECT_TYPE } from "@/enums";
import { HealthBarUIComponent } from "@/ui/components/health_bar.ui_component";

export class PlayerCharacter extends CharacterModel {
  constructor() {
    super();
    super.attachAnimations([
      new PlayerWalkDownAnimation(super.getChar()),
      new PlayerWalkLeftAnimation(super.getChar()),
      new PlayerWalkRightAnimation(super.getChar()),
      new PlayerWalkUpAnimation(super.getChar()),
      new PlayerIdleDownAnimation(super.getChar()),
      new PlayerIdleLeftAnimation(super.getChar()),
      new PlayerIdleRightAnimation(super.getChar()),
      new PlayerIdleUpAnimation(super.getChar()),
      new PlayerBaseAttack01DownAnimation(super.getChar()),
      new PlayerBaseAttack01LeftAnimation(super.getChar()),
      new PlayerBaseAttack01RightAnimation(super.getChar()),
      new PlayerBaseAttack01UpAnimation(super.getChar()),
      new PlayerRollDownAnimation(super.getChar()),
      new PlayerRollLeftAnimation(super.getChar()),
      new PlayerRollRightAnimation(super.getChar()),
      new PlayerRollUpAnimation(super.getChar()),
    ]);

    super.attachComponents([new HealthBarUIComponent(super.getChar())]);
    this.isPlayer = true;
    this.type = OBJECT_TYPE.PLAYER;
    this.attack = null;
    this.position = { x: 20, y: 40 };
  }
}
