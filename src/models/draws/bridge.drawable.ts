import { DrawableModel } from "@/core";

import asset from "@/assets/Tiles/Bridge/Bridge_Stone_Vertical.png";

export class BridgeHorizontalDrawable extends DrawableModel {
  constructor() {
    super(asset, 64, 96, 64, 96, 1, 0, false);
    this.position = { x: 200, y: 200 };
  }
}
