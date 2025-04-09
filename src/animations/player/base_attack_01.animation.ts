import { AnimationModel, GameObject } from "@/core";

import sprite from "@/assets/Player/Player_Modular/Player_Base/Player_Base_Attack.png";

export class PlayerBaseAttack01UpAnimation extends AnimationModel {
  constructor(char: GameObject) {
    super("base_attack_01_up", sprite, 32, 32, 4, char, 7);
  }
}

export class PlayerBaseAttack01DownAnimation extends AnimationModel {
  constructor(char: GameObject) {
    super("base_attack_01_down", sprite, 32, 32, 4, char, 0);
  }
}

export class PlayerBaseAttack01LeftAnimation extends AnimationModel {
  constructor(char: GameObject) {
    super("base_attack_01_left", sprite, 32, 32, 4, char, 4, true);
  }
}

export class PlayerBaseAttack01RightAnimation extends AnimationModel {
  constructor(char: GameObject) {
    super("base_attack_01_right", sprite, 32, 32, 4, char, 4);
  }
}
