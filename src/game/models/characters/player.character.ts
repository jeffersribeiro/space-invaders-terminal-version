import {
  TransformComponent,
  InputComponent,
  SpriteComponent,
} from "@/engine/components";
import { Entity } from "@/engine/core";

import { OBJECT_TYPE } from "@/engine/enums";

import {
  PlayerWalkUpAnimation,
  PlayerWalkLeftAnimation,
  PlayerWalkRightAnimation,
  PlayerWalkDownAnimation,
  PlayerBaseAttack01DownAnimation,
  PlayerBaseAttack01LeftAnimation,
  PlayerBaseAttack01RightAnimation,
  PlayerBaseAttack01UpAnimation,
  PlayerIdleDownAnimation,
  PlayerIdleLeftAnimation,
  PlayerIdleRightAnimation,
  PlayerIdleUpAnimation,
  PlayerRollDownAnimation,
  PlayerRollLeftAnimation,
  PlayerRollRightAnimation,
  PlayerRollUpAnimation,
} from "@/game/animations/player";
import { SizeComponent } from "@/engine/components/SizeComponent";

export class PlayerCharacter extends Entity {
  constructor() {
    super();

    const input = new InputComponent();
    const sprite = new SpriteComponent();
    const transform = new TransformComponent();
    const size = new SizeComponent();

    sprite.attachAnimations(
      new PlayerWalkUpAnimation(),
      new PlayerWalkLeftAnimation(),
      new PlayerWalkRightAnimation(),
      new PlayerWalkDownAnimation(),
      new PlayerBaseAttack01DownAnimation(),
      new PlayerBaseAttack01LeftAnimation(),
      new PlayerBaseAttack01RightAnimation(),
      new PlayerBaseAttack01UpAnimation(),
      new PlayerIdleDownAnimation(),
      new PlayerIdleLeftAnimation(),
      new PlayerIdleRightAnimation(),
      new PlayerIdleUpAnimation(),
      new PlayerRollDownAnimation(),
      new PlayerRollLeftAnimation(),
      new PlayerRollRightAnimation(),
      new PlayerRollUpAnimation()
    );

    super.addComponent(transform);
    super.addComponent(sprite);
    super.addComponent(input);
    super.addComponent(size);

    this.isPlayer = true;
    this.type = OBJECT_TYPE.PLAYER;
  }
}
