import { ScreenModel } from "../models/screen.model";

import { GenericObject } from "../shared/generic_object";

export class WorldScreen extends ScreenModel {
  constructor(objects: GenericObject[]) {
    super("world", objects);
  }
}
