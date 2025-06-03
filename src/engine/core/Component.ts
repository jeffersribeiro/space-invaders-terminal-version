import { Entity } from "./Entity";

export abstract class Component {
  entity!: Entity;
  start?(): void;
  update?(dt: number): void;
  onDestroy?(): void;
}
