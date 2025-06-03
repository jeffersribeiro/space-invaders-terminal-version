import { Animation } from "@/engine/core";

import sprite from "@/game/assets/Player/Player_Modular/Player_Base/Player_Base_Attack.png";

export class PlayerBaseAttack01UpAnimation extends Animation {
  constructor() {
    super("base_attack_01_up", sprite, 32, 32, 32, 32, 4, 7);
  }
}

export class PlayerBaseAttack01DownAnimation extends Animation {
  constructor() {
    super("base_attack_01_down", sprite, 32, 32, 32, 32, 4, 0);
  }
}

export class PlayerBaseAttack01LeftAnimation extends Animation {
  constructor() {
    super("base_attack_01_left", sprite, 32, 32, 32, 32, 4, 4, true);
  }
}

export class PlayerBaseAttack01RightAnimation extends Animation {
  constructor() {
    super("base_attack_01_right", sprite, 32, 32, 32, 32, 4, 4);
  }
}
