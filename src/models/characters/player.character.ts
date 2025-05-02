import Animations from "@/animations/player";
import { InputComponent, SpriteComponent } from "@/components";
import { TransformComponent } from "@/components/TransformComponent";

import { Character } from "@/core";
import { OBJECT_TYPE } from "@/enums";

export class PlayerCharacter extends Character {
  constructor() {
    super();

    const input = new InputComponent();
    const sprite = new SpriteComponent();
    sprite.attachAnimations(Animations);

    const transform = new TransformComponent();

    super.addComponent(transform);
    super.addComponent(sprite);
    super.addComponent(input);

    this.isPlayer = true;
    this.type = OBJECT_TYPE.PLAYER;
  }
}
