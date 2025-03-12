import { stdin } from "node:process";
import { GAMEPED_MAPPED_KEY } from "../enums";

export class GamePadModel {
  private buttonFired(
    callback: (key: GAMEPED_MAPPED_KEY | undefined) => void
  ): void {
    // stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    stdin.on("data", (key: string) => {
      let mappedKey: GAMEPED_MAPPED_KEY | undefined;

      if (key == "\u001B\u005B\u0041") {
        mappedKey = GAMEPED_MAPPED_KEY.MOVE_UP;
      }
      if (key == "\u001B\u005B\u0043") {
        mappedKey = GAMEPED_MAPPED_KEY.MOVE_RIGHT;
      }
      if (key == "\u001B\u005B\u0042") {
        mappedKey = GAMEPED_MAPPED_KEY.MOVE_DOWN;
      }
      if (key == "\u001B\u005B\u0044") {
        mappedKey = GAMEPED_MAPPED_KEY.MOVE_LEFT;
      }

      if (key == "\u0003") {
        process.exit(); // ctrl-c
      }

      console.log({ mappedKey });
      callback(mappedKey);
    });
  }

  subscribe(callback: (key: GAMEPED_MAPPED_KEY | undefined) => void): void {
    this.buttonFired(callback);
  }
}
