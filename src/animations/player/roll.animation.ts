import { AnimationModel, GameObject } from "@/core";

import sprite from "@/assets/Player/Player_Modular/Player_Base/Player_Base_Roll.png";

export class PlayerRollUpAnimation extends AnimationModel {
  constructor(char: GameObject) {
    super("roll_up", sprite, 32, 32, 6, char, 1);
  }
}

export class PlayerRollDownAnimation extends AnimationModel {
  constructor(char: GameObject) {
    super("roll_down", sprite, 32, 32, 6, char, 0);
  }
}

export class PlayerRollLeftAnimation extends AnimationModel {
  constructor(char: GameObject) {
    super("roll_left", sprite, 32, 32, 6, char, 2, true);
  }
}

export class PlayerRollRightAnimation extends AnimationModel {
  constructor(char: GameObject) {
    super("roll_right", sprite, 32, 32, 6, char, 2);
  }
}
