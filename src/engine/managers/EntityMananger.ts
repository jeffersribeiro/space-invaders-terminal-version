import { Entity, Component } from "@/engine/core";

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

  queryEntities(components: (new (...args: any) => Component)[]): Entity[] {
    return this.entities.filter((entity) =>
      components.every((comp) => entity.getComponent(comp))
    );
  }
}
