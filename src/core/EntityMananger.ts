import { Component } from "./Component";
import { Entity } from "./Entity";

export class EntityManager {
  private entities: Entity[] = [];

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  removeEntity(entity: Entity): void {
    this.entities = this.entities.filter((e) => e !== entity);
  }

  getEntities(): Entity[] {
    return this.entities;
  }

  queryEntities(
    components: Array<new (...args: any[]) => Component>
  ): Entity[] {
    return this.entities.filter((entity) =>
      components.every((comp) => entity.getComponent(comp))
    );
  }
}
