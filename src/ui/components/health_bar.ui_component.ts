import { CharacterModel } from "@/entities";
import { Component } from "@/entities/component";

export class HealthBarUIComponent extends Component {
  private currentHealth: number;
  private maxHealth: number;

  constructor(private readonly char: CharacterModel) {
    super("health_bar_ui_component");

    this.currentHealth = this.char.getHeath();
    this.maxHealth = 100;
  }

  public updateHealth(newHealth: number): void {
    this.currentHealth = newHealth;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const healthPercentage = this.currentHealth / this.maxHealth;
    const barWidth = 50;
    const currentBarWidth = barWidth * healthPercentage;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = "#ccc";
      this.ctx.fillRect(0, 0, barWidth, 5);

      this.ctx.fillStyle =
        healthPercentage > 0.5
          ? "green"
          : healthPercentage > 0.2
          ? "yellow"
          : "red";

      this.ctx.fillRect(0, 0, currentBarWidth, 5);

      const frame = new Image();
      frame.src = this.canvas.toDataURL();

      ctx.fillStyle = "black";
      ctx.font = "10px Arial";
      ctx.fillText(
        `${Math.floor(healthPercentage * 100)}%`,
        this.char.position.x + 30,
        this.char.position.y + 15
      );

      ctx.drawImage(
        frame,
        this.char.position.x + 30,
        this.char.position.y + 20
      );
    }
  }
}
