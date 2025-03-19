import { CharacterModel } from "@/entities";
import { Component } from "@/entities/component";

export class HealthBarUIComponent extends Component {
  private maxHealth: number;

  constructor(private readonly char: CharacterModel) {
    super("health_bar_ui_component");

    this.maxHealth = 100;
  }

  public render(ctx: CanvasRenderingContext2D): void {
    const healthPercentage = this.char.health / this.maxHealth;
    const barWidth = 30;
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
        this.char.position.x + 35,
        this.char.position.y + 15
      );

      ctx.drawImage(
        frame,
        this.char.position.x + 35,
        this.char.position.y + 20
      );
    }
  }
}
