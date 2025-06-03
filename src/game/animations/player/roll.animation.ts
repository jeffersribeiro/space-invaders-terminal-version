import { Animation } from "@/engine/core";

import sprite from "@/game/assets/Player/Player_Modular/Player_Base/Player_Base_Roll.png";

export class PlayerRollUpAnimation extends Animation {
  constructor() {
    super("roll_up", sprite, 32, 32, 32, 32, 6, 1);
  }
}

export class PlayerRollDownAnimation extends Animation {
  constructor() {
    super("roll_down", sprite, 32, 32, 32, 32, 6, 0);
  }
}

export class PlayerRollLeftAnimation extends Animation {
  constructor() {
    super("roll_left", sprite, 32, 32, 32, 32, 6, 2, true);
  }
}

export class PlayerRollRightAnimation extends Animation {
  constructor() {
    super("roll_right", sprite, 32, 32, 32, 32, 6, 2);
  }
}
