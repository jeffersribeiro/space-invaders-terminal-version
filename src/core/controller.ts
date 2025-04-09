import { GAMEPED_MAPPED_KEY } from "@/enums";

export enum KeyBoardKeyCode {
  KeyW = "KeyW",
  KeyA = "KeyA",
  KeyS = "KeyS",
  KeyD = "KeyD",
  MouseL = "MouseL",
  MouseR = "MouseR",
}

export interface GamepadButton {
  value: GAMEPED_MAPPED_KEY;
  pressed: boolean;
  touched: boolean;
}

export class ControllerModel {
  private static gamepad: Gamepad | null = null;
  static controller: "GAMEPAD" | "COMPUTER" | null = null;

  private static updateGamepadState() {
    const gamepads = navigator.getGamepads();
    this.gamepad = gamepads[0] || null;
  }

  private static getKeyBoard(): GamepadButton[] {
    const mappedMouse: Record<
      number,
      KeyBoardKeyCode.MouseL | KeyBoardKeyCode.MouseR
    > = {
      0: KeyBoardKeyCode.MouseL,
      2: KeyBoardKeyCode.MouseR,
    };

    let mappedButtons: Record<KeyBoardKeyCode, GamepadButton> = {
      KeyW: {
        value: GAMEPED_MAPPED_KEY.MOVE_UP,
        pressed: false,
        touched: false,
      },
      KeyA: {
        value: GAMEPED_MAPPED_KEY.MOVE_LEFT,
        pressed: false,
        touched: false,
      },
      KeyS: {
        value: GAMEPED_MAPPED_KEY.MOVE_DOWN,
        pressed: false,
        touched: false,
      },
      KeyD: {
        value: GAMEPED_MAPPED_KEY.MOVE_RIGHT,
        pressed: false,
        touched: false,
      },
      MouseL: {
        value: GAMEPED_MAPPED_KEY.ATTACK_01,
        pressed: false,
        touched: false,
      },
      MouseR: {
        value: GAMEPED_MAPPED_KEY.ATTACK_02,
        pressed: false,
        touched: false,
      },
    };

    window.addEventListener("keydown", (ev) => {
      console.log("keydown", ev.code);
      if (mappedButtons[ev.code as KeyBoardKeyCode]) {
        mappedButtons[ev.code as KeyBoardKeyCode].pressed = true;
        mappedButtons[ev.code as KeyBoardKeyCode].touched = true;
      }
    });

    window.addEventListener("keyup", (ev) => {
      if (mappedButtons[ev.code as KeyBoardKeyCode]) {
        mappedButtons[ev.code as KeyBoardKeyCode].pressed = false;
      }
    });

    window.addEventListener("mouseup", (ev) => {
      let mapClickToButton = mappedMouse[ev.button];
      if (mappedButtons[mapClickToButton]) {
        mappedButtons[mapClickToButton as KeyBoardKeyCode].pressed = true;
        mappedButtons[mapClickToButton as KeyBoardKeyCode].touched = true;
      }
    });

    window.addEventListener("mousedown", (ev) => {
      let mapClickToButton = mappedMouse[ev.button];
      if (mapClickToButton) {
        mappedButtons[mapClickToButton as KeyBoardKeyCode].touched = false;
      }
    });

    return Object.values(mappedButtons);
  }

  static isGamepadConnected(): boolean {
    this.updateGamepadState();
    return this.gamepad !== null;
  }

  private static getGamepadController(): GamepadButton[] {
    this.controller = "GAMEPAD";

    if (!this.gamepad) {
      throw new Error("Gamepad not connected");
    }

    return this.gamepad.buttons as GamepadButton[];
  }

  private static getKeyBoardController(): GamepadButton[] {
    this.controller = "COMPUTER";
    return this.getKeyBoard();
  }

  public static getController(): GamepadButton[] {
    const isGamepadConnected = this.isGamepadConnected();

    return isGamepadConnected
      ? this.getGamepadController()
      : this.getKeyBoardController();
  }
}
