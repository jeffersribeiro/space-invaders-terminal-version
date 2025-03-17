import { GAMEPED_MAPPED_KEY } from "@/enums";

export class GamePadModel {
  private onKeyPressIn(
    callback: (key: GAMEPED_MAPPED_KEY | undefined) => void
  ): void {
    document.addEventListener("keypress", (event) => {
      const key = event.key;
      let mappedKey: GAMEPED_MAPPED_KEY | undefined;

      if (key == "d") {
        mappedKey = GAMEPED_MAPPED_KEY.MOVE_RIGHT;
      }
      if (key == "a") {
        mappedKey = GAMEPED_MAPPED_KEY.MOVE_LEFT;
      }
      if (key == "w") {
        mappedKey = GAMEPED_MAPPED_KEY.MOVE_UP;
      }
      if (key == "s") {
        mappedKey = GAMEPED_MAPPED_KEY.MOVE_DOWN;
      }
      if (key == "1") {
        mappedKey = GAMEPED_MAPPED_KEY.ATTACK_01;
      }

      callback(mappedKey);
    });
  }

  private onKeyPressOut(callback: () => void) {
    document.addEventListener("keydown", () => {
      callback();
    });
  }

  subscribe(callback: (key: GAMEPED_MAPPED_KEY | undefined) => void): void {
    this.onKeyPressIn(callback);
  }

  unsubcribe(callback: () => void) {
    this.onKeyPressOut(callback);
  }
}
