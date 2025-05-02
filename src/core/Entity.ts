import { Helper } from "@/helper";
import { Component } from "@/core";

import { objectsToRender } from "@/states/game.state";
import { OBJECT_TYPE } from "@/enums";

export abstract class Entity {
  id: string;
  type: OBJECT_TYPE | null = null;
  isPlayer: boolean = false;

  components: Component[] = [];

  private readonly helper: Helper = new Helper();

  constructor() {
    this.id = this.helper.generateUUID();
    objectsToRender.push(this);
  }

  addComponent<T extends Component>(component: T): T {
    component.entity = this;
    this.components.push(component);
    component.start?.();
    return component;
  }

  getComponent<T extends Component>(type: new (...args: any[]) => T): T {
    const component = this.components.find((c) => c instanceof type) as T;
    if (!component) {
      throw new Error(`Component ${type.name} not found`);
    }
    return component;
  }

  update(dt: number) {
    this.components.forEach((c) => c.update?.(dt));
  }

  destroy() {
    this.components.forEach((c) => c.onDestroy?.());
  }
}
