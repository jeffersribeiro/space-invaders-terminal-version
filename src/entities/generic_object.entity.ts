import { Point } from "@/interfaces";
import { GAMEPED_MAPPED_KEY, OBJECT_TYPE } from "@/enums";
import { AnimationModel } from "./animation.entity";
import { Component } from "./component";

export abstract class GenericObject {
  id: number;
  type: OBJECT_TYPE | null = null;
  position: Point = { x: 0, y: 0 };
  width: number = 100;
  height: number = 100;
  isPlayer: boolean = false;
  animations: Record<string, AnimationModel> = {};
  components: Component[] = [];
  weight: number = 60;
  private attackLoaded = 0;
  velocityY: number = 0.5;
  velocityX: number = 0;
  private currentAction: string = "idle";
  private moveSpeed: number = 5;
  collider: Array<GenericObject> = [];
  health: number = 100;
  mana: number = 100;

  constructor() {
    this.id =
      (this.position.x + 0.5) *
      (this.position.y + 0.1) *
      this.width *
      this.height;
  }

  public boxCollider(objects: GenericObject[]): void {
    // Clear the collider array each time to track the objects it is currently colliding with
    this.collider = [];

    // Iterate over all objects and detect collisions
    for (const object of objects) {
      const isItself = this !== object;

      const isPositionXMoreThanOther =
        this.position.x < object.position.x + object.width;
      const isPositionXLessThanOther =
        this.position.x + this.width > object.position.x;
      const isPositionYMoreThanOther =
        this.position.y + this.height > object.position.y;
      const isPositionYLessThanOther =
        this.position.y < object.position.y + object.height;

      // If a collision is detected, add the object to the collider array
      if (
        isItself &&
        isPositionXMoreThanOther &&
        isPositionXLessThanOther &&
        isPositionYMoreThanOther &&
        isPositionYLessThanOther
      ) {
        this.collider.push(object); // Add the object to the collider array
      }
    }
  }

  public rigidBox() {
    // Iterate through all the objects in the collider array
    for (const object of this.collider) {
      const weightDifference = this.weight < object.weight;

      // Handle horizontal collision (left or right)
      if (
        this.position.x + this.width > object.position.x &&
        this.position.x < object.position.x
      ) {
        if (weightDifference) {
          this.position.x = object.position.x - this.width;
        }
      } else if (
        this.position.x < object.position.x + object.width &&
        this.position.x + this.width > object.position.x + object.width
      ) {
        if (weightDifference) {
          this.position.x = object.position.x + object.width;
        }
      }

      // Handle vertical collision (up or down)
      if (
        this.position.y + this.height > object.position.y &&
        this.position.y < object.position.y
      ) {
        if (weightDifference) {
          this.position.y = object.position.y - this.height;
          this.velocityY = 0; // Stop downward velocity (gravity)
        }
      } else if (
        this.position.y < object.position.y + object.height &&
        this.position.y + this.height > object.position.y + object.height
      ) {
        if (weightDifference) {
          this.position.y = object.position.y + object.height;
        }
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
    this.position.y -= this.moveSpeed + 10;
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
    if (this.attackLoaded < 1) {
      this.attackLoaded += 0.3;
    } else {
      this.attackLoaded = 0;
      if (this.collider.length) {
        this.collider
          .filter((c) => c.type === OBJECT_TYPE.NPC)
          .map((o) => {
            o.setHeath((o.health -= 1));
            o.takeDamage();
          });
      }
      this.setCurrentAction(attack);
    }
  }

  takeDamage(): void {
    if (this.attackLoaded < 1) {
      this.setCurrentAction("idle");
    } else {
      this.setCurrentAction("hurt");
    }
  }

  private setHeath(health: number) {
    this.health = health;
  }

  getHeath(): number {
    return this.health;
  }

  buttonPressed(button: GAMEPED_MAPPED_KEY | undefined): void {
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

  move(axis: readonly number[]): void {
    const [axisX, axisY] = axis;
    this.position.x += axisX * this.moveSpeed;
    this.position.y += axisY * this.moveSpeed;
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

      this.move(gamepad.axes);

      if (buttonPressed > 0) {
        this.buttonPressed(buttonPressed);
      } else {
        this.setCurrentAction("idle");
      }
    }
  }

  applyGravity(): void {
    if (this.velocityY < 10) {
      this.velocityY += 0.5;
    }

    this.position.y += this.velocityY;

    if (this.position.y > 500) {
      this.position.y = 500;
      this.velocityY = 0;
    }
  }
}
