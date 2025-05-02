// src/components/InputComponent.ts

import { Component } from "@/core/Component";
import { GAMEPED_MAPPED_KEY } from "@/enums";
import { ORIENTATION } from "@/enums";
import { TransformComponent } from "./TransformComponent";
import { SpriteComponent } from "./SpriteComponent";
import { ControllerModel } from "@/core";

export class InputComponent extends Component {
  private transform!: TransformComponent;
  private sprite!: SpriteComponent;

  // current facing direction
  private orientation: ORIENTATION = ORIENTATION.DOWN;

  // units per millisecond
  private readonly speed = 0.1;

  // velocity components
  private vx = 0;
  private vy = 0;

  start(): void {
    const t = this.entity.getComponent(TransformComponent);
    if (!t) throw new Error("InputComponent requires TransformComponent");
    this.transform = t;

    const s = this.entity.getComponent(SpriteComponent);
    if (!s) throw new Error("InputComponent requires SpriteComponent");
    this.sprite = s;
  }

  /**
   * Called once per frame with dt = milliseconds since last update
   */
  update(dt: number): void {
    // 1) Read controller buttons
    const buttons = ControllerModel.getController();

    // 2) Reset velocity
    this.vx = 0;
    this.vy = 0;

    // 3) Map buttons to velocity
    if (buttons[GAMEPED_MAPPED_KEY.UP_ARROW].pressed) this.vy = -this.speed;
    if (buttons[GAMEPED_MAPPED_KEY.DOWN_ARROW].pressed) this.vy = this.speed;
    if (buttons[GAMEPED_MAPPED_KEY.LEFT_ARROW].pressed) this.vx = -this.speed;
    if (buttons[GAMEPED_MAPPED_KEY.RIGHT_ARROW].pressed) this.vx = this.speed;

    // 4) Apply movement
    this.transform.x += this.vx * dt;
    this.transform.y += this.vy * dt;

    // 5) Determine animation & orientation
    if (this.vx !== 0 || this.vy !== 0) {
      // moving
      let dir: ORIENTATION;
      if (Math.abs(this.vx) > Math.abs(this.vy)) {
        dir = this.vx > 0 ? ORIENTATION.RIGHT : ORIENTATION.LEFT;
      } else {
        dir = this.vy > 0 ? ORIENTATION.DOWN : ORIENTATION.UP;
      }
      this.orientation = ORIENTATION[dir];
      this.sprite.setCurrent(`walk_${dir}`);
    } else {
      // idle
      const idleDir = ORIENTATION[this.orientation].toLowerCase();
      this.sprite.setCurrent(`idle_${idleDir}`);
    }

    // 6) Example: handle roll or jump buttons
    if (buttons[GAMEPED_MAPPED_KEY.ACTION_ONE].pressed) {
      this.sprite.setCurrent(
        `roll_${ORIENTATION[this.orientation].toLowerCase()}`
      );
      // apply a small nudge:
      const nudge = 0.2 * dt;
      if (this.orientation === ORIENTATION.LEFT) this.transform.x -= nudge;
      if (this.orientation === ORIENTATION.RIGHT) this.transform.x += nudge;
      if (this.orientation === ORIENTATION.UP) this.transform.y -= nudge;
      if (this.orientation === ORIENTATION.DOWN) this.transform.y += nudge;
    }
  }
}
