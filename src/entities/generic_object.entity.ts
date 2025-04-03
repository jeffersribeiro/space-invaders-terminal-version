import { Helper } from "@/helper";
import { Point } from "@/interfaces";
import { DIRECTION, GAMEPED_MAPPED_KEY, OBJECT_TYPE } from "@/enums";

import { Component } from "./component";

import { objectsToRender } from "@/states/game.state";

import { AnimationModel } from "./animation.entity";
import { Attack } from "./attack.entity";
import { ControllerModel } from "./controller.entity";

export class GenericObject {
  id: string;
  attack: Attack | null = null;
  type: OBJECT_TYPE | null = null;
  position: Point = { x: 0, y: 0 };
  width: number = 40;
  height: number = 40;
  isPlayer: boolean = false;
  animations: Record<string, AnimationModel> = {};
  components: Component[] = [];
  weight: number = 60;
  attackLoaded = 0;
  velocityY: number = 0.5;
  velocityX: number = 0;
  currentAction: string = "idle_right";
  currentDirection: DIRECTION = DIRECTION.DOWN;
  moveSpeed: number = 10;
  collider: Array<GenericObject> = [];
  health: number = 100;
  mana: number = 100;

  hasGravity: boolean = true;

  private readonly helper: Helper = new Helper();

  constructor() {
    this.id = this.helper.generateUUID();
    objectsToRender.push(this);
  }

  public boxCollider(objects: GenericObject[]): void {
    this.collider = [];

    objects.forEach((object) => {
      const isItself = this !== object;

      const isPositionXMoreThanOther =
        this.position.x < object.position.x + object.width;
      const isPositionXLessThanOther =
        this.position.x + this.width > object.position.x;
      const isPositionYMoreThanOther =
        this.position.y + this.height > object.position.y;
      const isPositionYLessThanOther =
        this.position.y < object.position.y + object.height;

      if (
        isItself &&
        isPositionXMoreThanOther &&
        isPositionXLessThanOther &&
        isPositionYMoreThanOther &&
        isPositionYLessThanOther
      ) {
        this.collider.push(object);
      }
    });
  }

  public rigidBox() {
    this.collider.forEach((object) => {
      const weightDifference = this.weight < object.weight;

      if (
        this.position.x + this.width > object.position.x &&
        this.position.x < object.position.x
      ) {
        if (
          this.position.x + this.width > object.position.x &&
          weightDifference
        ) {
          this.position.x = object.position.x - this.width;
        }
      } else if (
        this.position.x < object.position.x + object.width &&
        this.position.x + this.width > object.position.x + object.width
      ) {
        if (
          this.position.x < object.position.x + object.width &&
          weightDifference
        ) {
          this.position.x = object.position.x + object.width;
        }
      }

      if (
        this.position.y + this.height > object.position.y &&
        this.position.y < object.position.y
      ) {
        if (
          this.position.y + this.height > object.position.y &&
          weightDifference
        ) {
          this.position.y = object.position.y - this.height;
          this.velocityY = 0;
        }
      } else if (
        this.position.y < object.position.y + object.height &&
        this.position.y + this.height > object.position.y + object.height
      ) {
        if (
          this.position.y < object.position.y + object.height &&
          weightDifference
        ) {
          this.position.y = object.position.y + object.height;
        }
      }
    });
  }

  public attachAnimations(animations: AnimationModel[]): void {
    animations.forEach((animation) => {
      this.animations[animation.getName()] = animation;
    });
  }

  public attachComponents(components: Component[]): void {
    this.components = components;
  }

  public getComponents(): Component[] {
    return this.components;
  }

  setCurrentAction(action: string): void {
    if (this.animations[action]) {
      this.currentAction = action;
    }
  }

  public moveUp(): void {
    this.currentDirection = DIRECTION.UP;
    this.setCurrentAction("walk_up");
    this.position.y -= this.moveSpeed;
  }

  public moveDown(): void {
    this.currentDirection = DIRECTION.DOWN;
    this.setCurrentAction("walk_down");
    this.position.y += this.moveSpeed;
  }

  public jump(): void {
    this.position.y -= 15;
  }

  public moveLeft(): void {
    this.currentDirection = DIRECTION.LEFT;
    this.setCurrentAction("walk_left");
    this.position.x -= this.moveSpeed;
  }

  public moveRight(): void {
    this.currentDirection = DIRECTION.RIGHT;
    this.setCurrentAction("walk_right");
    this.position.x += this.moveSpeed;
  }

  makeAttack(action: string): void {
    if (this.attackLoaded < 1) {
      this.attackLoaded += 0.3;
    } else {
      if (this.attack) {
        this.attack.makeAttack(action);
      }
    }
    const animationDirection = `${action}_${this.currentDirection.toLowerCase()}`;

    this.setCurrentAction(animationDirection);
  }

  roll() {
    const animationDirection = `roll_${this.currentDirection.toLowerCase()}`;

    switch (this.currentDirection) {
      case DIRECTION.UP:
        this.position.y -= 10;
        break;
      case DIRECTION.DOWN:
        this.position.y += 10;
        break;
      case DIRECTION.LEFT:
        this.position.x -= 10;
        break;
      case DIRECTION.RIGHT:
        this.position.x += 10;
        break;
    }

    this.setCurrentAction(animationDirection);
  }

  public takeDamage(): void {
    if (this.attackLoaded < 1) {
      this.setCurrentAction("idle");
    } else {
      this.setCurrentAction("hurt");
    }
  }

  public setHeath(health: number) {
    if (this.health > 0) {
      this.health = health;
    } else {
      this.kill();
    }
  }

  public getHeath(): number {
    return this.health;
  }

  attachObject(): void {
    if (this.collider.length) {
      const weapon = this.collider.find((o) => o.type === OBJECT_TYPE.WEAPON);

      if (weapon) {
        this.attack = weapon;
      }
    }
  }

  kill() {
    const objectIndex = objectsToRender.findIndex((o) => o.id === this.id);

    if (objectIndex !== -1) {
      objectsToRender.splice(objectIndex, 1);
    }
  }

  public handleButton(button: GAMEPED_MAPPED_KEY): void {
    const goTo: Record<GAMEPED_MAPPED_KEY, () => void> = {
      [GAMEPED_MAPPED_KEY.MOVE_RIGHT]: this.moveRight,
      [GAMEPED_MAPPED_KEY.MOVE_LEFT]: this.moveLeft,
      [GAMEPED_MAPPED_KEY.MOVE_UP]: this.moveUp,
      [GAMEPED_MAPPED_KEY.MOVE_DOWN]: this.moveDown,
      [GAMEPED_MAPPED_KEY.JUMP]: this.jump,
      [GAMEPED_MAPPED_KEY.ROLL]: () => this.roll(),
      [GAMEPED_MAPPED_KEY.ATTACK_01]: () => this.makeAttack("base_attack_01"),
      [GAMEPED_MAPPED_KEY.ATTACK_02]: () => this.makeAttack("base_attack_01"),
      [GAMEPED_MAPPED_KEY.ATTACH_OBJECT]: this.attachObject,
    };

    const action = goTo[button];
    if (action) {
      action.call(this);
    }
  }

  public move(axis: readonly number[]): void {
    const [axisX, axisY] = axis;
    this.position.x += axisX * this.moveSpeed;
    this.position.y += axisY * this.moveSpeed;
  }

  public getPosition(): Point {
    return this.position;
  }

  public setPosition(x: number, y: number): void {
    this.position = { x, y };
  }

  public setDefaultAnimation() {
    this.setCurrentAction("idle");
  }

  public render(ctx: CanvasRenderingContext2D): void {
    this.components.forEach((component) => {
      component.render(ctx);
    });

    const { x, y } = this.getPosition();

    const currentAnimation = this.animations[this.currentAction];

    currentAnimation.startAnimation(ctx, x, y);
  }

  public handleGamepadInput(): void {
    const gamepad = ControllerModel.getController();

    const buttonPressed = gamepad.find((button) => button.pressed);

    if (buttonPressed) {
      this.handleButton(buttonPressed.value);
    } else {
      const animationDirection = `idle_${this.currentDirection.toLowerCase()}`;
      this.setCurrentAction(animationDirection);
    }
  }

  public applyGravity(): void {
    if (this.hasGravity) {
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
}
