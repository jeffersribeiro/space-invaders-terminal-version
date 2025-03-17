import { Point } from "@/interfaces";
import { GAMEPED_MAPPED_KEY } from "@/enums";
import { AnimationModel } from "./animation.entity";
import { Component } from "./component";

export class GenericObject {
  position: Point = { x: 0, y: 0 };
  isPlayer: boolean = false;
  animations: Record<string, AnimationModel> = {};
  components: Component[] = [];
  private currentAction: string = "idle";
  private moveSpeed: number = 5;
  objectInContact: GenericObject | null = null;
  health: number = 40;
  mana: number = 100;

  checkProximity(otherObject: GenericObject): boolean {
    const distance = Math.sqrt(
      Math.pow(otherObject.position.x - this.position.x, 2) +
        Math.pow(otherObject.position.y - this.position.y, 2)
    );
    return distance < 30;
  }

  updateContact(objects: GenericObject[]): void {
    this.objectInContact = null;

    for (const otherObject of objects) {
      if (otherObject !== this && this.checkProximity(otherObject)) {
        this.objectInContact = otherObject;
        break;
      }
    }
  }

  attachAnimations(animations: AnimationModel[]): void {
    for (const animation of animations) {
      this.animations[animation.getName()] = animation;
    }
  }

  attachComponents(components: Component[]): void {
    this.components = components;
  }

  getComponents(): Component[] {
    return this.components;
  }

  setCurrentAction(action: string): void {
    if (this.animations[action]) {
      this.currentAction = action;
    }
  }

  private moveUp(): void {
    this.position.y -= this.moveSpeed;
  }

  private moveDown(): void {
    this.position.y += this.moveSpeed;
  }

  private moveLeft(): void {
    this.position.x -= this.moveSpeed;
  }

  private moveRight(): void {
    this.setCurrentAction("walk");
    this.position.x += this.moveSpeed;
  }

  private attack(attack: string): void {
    if (this.objectInContact) {
      const isPlayer = this.objectInContact.isPlayer;
      if (!isPlayer) {
        this.objectInContact.setHeath((this.objectInContact.health -= 10));
      }
      console.log(this.objectInContact?.health);
    }
    this.setCurrentAction(attack);
  }

  private setHeath(health: number) {
    this.health = health;
  }

  getHeath(): number {
    return this.health;
  }

  move(button: GAMEPED_MAPPED_KEY | undefined): void {
    if (this.isPlayer) {
      console.log(this.position);
    }
    if (button) {
      const goTo: Record<GAMEPED_MAPPED_KEY, () => void> = {
        [GAMEPED_MAPPED_KEY.MOVE_RIGHT]: this.moveRight,
        [GAMEPED_MAPPED_KEY.MOVE_LEFT]: this.moveLeft,
        [GAMEPED_MAPPED_KEY.MOVE_UP]: this.moveUp,
        [GAMEPED_MAPPED_KEY.MOVE_DOWN]: this.moveDown,
        [GAMEPED_MAPPED_KEY.ATTACK_01]: () => this.attack("attack01"),
        [GAMEPED_MAPPED_KEY.ATTACK_02]: () => this.attack("attack02"),
        [GAMEPED_MAPPED_KEY.ATTACK_03]: () => this.attack("attack03"),
      };

      const action = goTo[button];
      if (action) {
        action.call(this);
      }
    }
  }

  getPosition(): Point {
    return this.position;
  }

  setPosition(x: number, y: number): void {
    this.position = { x, y };
  }

  setDefaultAnimation() {
    this.setCurrentAction("idle");
  }

  public render(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    for (const component of this.components) {
      component.render(ctx);
    }

    const currentAnimation = this.animations[this.currentAction];
    if (currentAnimation) {
      const frame = currentAnimation.getAnimation();
      if (frame) {
        ctx.drawImage(frame, x, y);
      }
    }
  }

  handleGamepadInput(): void {
    const gamepad = navigator.getGamepads()[0];

    if (gamepad) {
      const buttonPressed = gamepad.buttons.findIndex(
        (button) => button.pressed
      );

      if (buttonPressed > 0) {
        this.move(buttonPressed);
      } else {
        this.setCurrentAction("idle");
      }
    }
  }
}
