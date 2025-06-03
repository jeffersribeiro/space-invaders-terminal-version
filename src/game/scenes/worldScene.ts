import { Scene } from "@/engine/core";
import { EntityManager } from "@/engine/managers";

export class WorldScene implements Scene {
  init(em: EntityManager) {
    // spawn player, enemies, terrain...
    console.log("WorldScene init");
  }
  update(em: EntityManager, dt: number) {
    // run gameplay systems here or let your Engine drive them
  }
  render(em: EntityManager, dt: number) {
    // draw world tiles, sprites...
  }
}
