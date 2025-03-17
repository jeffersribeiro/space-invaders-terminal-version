export abstract class Component {
  name: string;
  canvas: HTMLCanvasElement = document.createElement(
    "canvas"
  ) as HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
  constructor(name: string) {
    this.name = name;
    this.canvas.setAttribute("id", name);
  }

  public abstract render(ctx: CanvasRenderingContext2D): void;
}
