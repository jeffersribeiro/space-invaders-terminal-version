import { Transform } from "@/game/interfaces";
import { Component } from "../core";

export class TransformComponent extends Component {
  private tranform: Transform;

  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {
    super();

    this.tranform = { x, y, z };
  }

  public getTranform(): Transform {
    return this.tranform;
  }

  public setTranform(x: number, y: number, z: number): void {
    this.tranform = { x, y, z };
  }
}
