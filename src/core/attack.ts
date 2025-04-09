import { OBJECT_TYPE } from "@/enums";

import { GameObject } from "./game_object";

export class Attack extends GameObject {
  attackLoaded: number = 0;

  constructor() {
    super();
  }

  public makeAttack(action: string): void {
    if (this.attackLoaded < 1) {
      this.attackLoaded += 0.3;
    } else {
      this.attackLoaded = 0;

      if (this.collider.length) {
        this.collider
          .filter((c) => c.type === OBJECT_TYPE.NPC)
          .forEach((npc) => {
            npc.setHeath((npc.health -= 1));
            npc.takeDamage();
          });
      }
    }
    this.setCurrentAction(action);
  }
}
