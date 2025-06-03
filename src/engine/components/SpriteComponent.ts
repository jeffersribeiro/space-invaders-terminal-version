// src/components/SpriteComponent.ts
import { Component } from "../core/Component";
import { Animation } from "../core/Animation";

export class SpriteComponent extends Component {
  private animations: Record<string, Animation> = {};
  private currentAnim!: Animation;

  start() {
    // pick a default animation
    this.currentAnim = this.animations["idle_right"];
    if (!this.currentAnim) {
      throw new Error("No 'idle_right' animation attached");
    }
  }

  /** call once when all animations have been attached */
  setDefault(name: string) {
    if (!this.animations[name]) throw new Error(`Unknown anim ${name}`);
    this.currentAnim = this.animations[name];
  }

  /** attach one or more animations */
  attachAnimations(...anims: Animation[]) {
    anims.forEach((a) => {
      this.animations[a.name] = a;
    });
    // if no current yet, pick the first
    if (!this.currentAnim && anims.length) {
      this.currentAnim = anims[0];
    }
  }

  /** switch animations by name */
  play(_name: string) {
    const name = _name.toLowerCase();
    if (this.animations[name] && this.currentAnim.name !== name) {
      this.currentAnim = this.animations[name];
      // reset timing
      this.currentAnim["elapsedTime"] = 0;
      this.currentAnim["currentFrame"] = 0;
    }
  }

  update(dt: number) {
    this.currentAnim.update(dt);
  }

  render(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const { sx, sy, sw, sh } = this.currentAnim.getFrameRect();
    ctx.save();
    if (this.currentAnim["inverted"]) {
      ctx.scale(-1, 1);
      ctx.drawImage(
        this.currentAnim["spriteSheet"],
        sx,
        sy,
        sw,
        sh,
        -x - this.currentAnim["targetWidth"],
        y,
        this.currentAnim["targetWidth"],
        this.currentAnim["targetHeight"]
      );
    } else {
      ctx.drawImage(
        this.currentAnim["spriteSheet"],
        sx,
        sy,
        sw,
        sh,
        x,
        y,
        this.currentAnim["targetWidth"],
        this.currentAnim["targetHeight"]
      );
    }
    ctx.restore();
  }

  getFrameRect() {
    return this.currentAnim.getFrameRect();
  }
}
