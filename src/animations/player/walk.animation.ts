import { AnimationModel, GenericObject } from "@/entities";

import sprite from "@/assets/Player/Player_Modular/Player_Base/Player_Base_Running.png";

export class PlayerWalkUpAnimation extends AnimationModel {
  constructor(char: GenericObject) {
    super("walk_up", sprite, 32, 32, 6, char, 2);
  }
}

export class PlayerWalkDownAnimation extends AnimationModel {
  constructor(char: GenericObject) {
    super("walk_down", sprite, 32, 32, 6, char, 0);
  }
}

export class PlayerWalkLeftAnimation extends AnimationModel {
  constructor(char: GenericObject) {
    super("walk_left", sprite, 32, 32, 6, char, 1, true);
  }
}

export class PlayerWalkRightAnimation extends AnimationModel {
  constructor(char: GenericObject) {
    super("walk_right", sprite, 32, 32, 6, char, 1);
  }
}
