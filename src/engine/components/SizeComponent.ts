import { Component, Entity } from "../core";

export class SizeComponent extends Component {
  width: number = 40;
  height: number = 40;
  weight: number = 60;
  collidingWith: Entity[] = [];
}
