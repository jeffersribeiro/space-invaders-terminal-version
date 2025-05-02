import { Animation } from "@/core";

import sprite from "@/assets/Player/Player_Modular/Player_Base/Player_Base_Idle.png";

export class PlayerIdleUpAnimation extends Animation {
  constructor() {
    super("idle_up", sprite, 32, 32, 32, 32, 6, 2);
  }
}

export class PlayerIdleDownAnimation extends Animation {
  constructor() {
    super("idle_down", sprite, 32, 32, 32, 32, 6, 0);
  }
}

export class PlayerIdleLeftAnimation extends Animation {
  constructor() {
    super("idle_left", sprite, 32, 32, 32, 32, 6, 1, true);
  }
}

export class PlayerIdleRightAnimation extends Animation {
  constructor() {
    super("idle_right", sprite, 32, 32, 32, 32, 6, 1);
  }
}
