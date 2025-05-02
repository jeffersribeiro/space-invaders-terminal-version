import { Entity } from "./Entity";

export class Character extends Entity {
  constructor() {
    super();
  }

  getChar(): Character {
    return this;
  }
}
