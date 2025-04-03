import { AnimationModel, GenericObject } from "@/entities";

import sprite from "@/assets/Player/Player_Modular/Player_Base/Player_Base_Idle.png";

export class PlayerIdleUpAnimation extends AnimationModel {
  constructor(char: GenericObject) {
    super("idle_up", sprite, 32, 32, 6, char, 2);
  }
}

export class PlayerIdleDownAnimation extends AnimationModel {
  constructor(char: GenericObject) {
    super("idle_down", sprite, 32, 32, 6, char, 0);
  }
}

export class PlayerIdleLeftAnimation extends AnimationModel {
  constructor(char: GenericObject) {
    super("idle_left", sprite, 32, 32, 6, char, 1, true);
  }
}

export class PlayerIdleRightAnimation extends AnimationModel {
  constructor(char: GenericObject) {
    super("idle_right", sprite, 32, 32, 6, char, 1);
  }
}
