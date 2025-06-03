import { Scene } from "@/engine/core";
import { EntityManager } from "@/engine/managers";

export class MenuScene implements Scene {
  init(em: EntityManager) {
    // e.g. create menu UI entities
    console.log("MenuScene init");
  }
  update(em: EntityManager, dt: number) {
    // handle menu navigation, button presses...
  }
  render(em: EntityManager, dt: number) {
    // draw menu background, buttons...
  }
  destroy(em: EntityManager) {
    // cleanup menu entities if needed
    console.log("MenuScene destroy");
  }
}
