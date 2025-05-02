import { Animation, Entity } from "@/core";

import sprite from "@/assets/Player/Player_Modular/Player_Base/Player_Base_Running.png";

export class PlayerWalkUpAnimation extends Animation {
  constructor() {
    super("walk_up", sprite, 32, 32, 32, 32, 6, 2);
  }
}

export class PlayerWalkDownAnimation extends Animation {
  constructor() {
    super("walk_down", sprite, 32, 32, 32, 32, 6, 0);
  }
}

export class PlayerWalkLeftAnimation extends Animation {
  constructor() {
    super("walk_left", sprite, 32, 32, 32, 32, 6, 1, true);
  }
}

export class PlayerWalkRightAnimation extends Animation {
  constructor() {
    super("walk_right", sprite, 32, 32, 32, 32, 6, 1);
  }
}
