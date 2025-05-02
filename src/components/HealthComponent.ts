import { Component } from "@/core";

export class HealthComponent extends Component {
  constructor(public health: number) {
    super();
  }

  takeDamage(amount: number) {
    this.health -= amount;
    if (this.health <= 0) {
      console.log(`${this.entity.id} died`);
    }
  }

  public setHeath(health: number) {
    this.health = health;
  }

  public getHeath(): number {
    return this.health;
  }
}
