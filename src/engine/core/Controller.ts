import { GAMEPED_MAPPED_KEY } from "@/engine/enums";

export enum KeyBoardKeyCode {
  KeyW = "KeyW",
  KeyA = "KeyA",
  KeyS = "KeyS",
  KeyD = "KeyD",
  MouseL = "MouseL",
  MouseR = "MouseR",
}

export interface GamepadButtonState {
  value: GAMEPED_MAPPED_KEY;
  pressed: boolean;
  touched: boolean;
}

export class Controller {
  private static gamepad: Gamepad | null = null;
  private static keyboardState: Record<KeyBoardKeyCode, GamepadButtonState>;
  private static mouseMap: Record<number, KeyBoardKeyCode> = {
    0: KeyBoardKeyCode.MouseL,
    2: KeyBoardKeyCode.MouseR,
  };
  private static inited = false;

  /** Call once at app startup */
  static initialize() {
    if (this.inited) return;
    this.inited = true;

    // initial state
    this.keyboardState = {
      [KeyBoardKeyCode.KeyW]: {
        value: GAMEPED_MAPPED_KEY.UP_ARROW,
        pressed: false,
        touched: false,
      },
      [KeyBoardKeyCode.KeyA]: {
        value: GAMEPED_MAPPED_KEY.LEFT_ARROW,
        pressed: false,
        touched: false,
      },
      [KeyBoardKeyCode.KeyS]: {
        value: GAMEPED_MAPPED_KEY.DOWN_ARROW,
        pressed: false,
        touched: false,
      },
      [KeyBoardKeyCode.KeyD]: {
        value: GAMEPED_MAPPED_KEY.RIGHT_ARROW,
        pressed: false,
        touched: false,
      },
      [KeyBoardKeyCode.MouseL]: {
        value: GAMEPED_MAPPED_KEY.ACTION_ONE,
        pressed: false,
        touched: false,
      },
      [KeyBoardKeyCode.MouseR]: {
        value: GAMEPED_MAPPED_KEY.ACTION_TWO,
        pressed: false,
        touched: false,
      },
    };

    // keyboard
    window.addEventListener("keydown", (ev) => {
      const k = ev.code as KeyBoardKeyCode;
      if (k in this.keyboardState) {
        const btn = this.keyboardState[k];
        btn.pressed = true;
        btn.touched = true;
      }
    });
    window.addEventListener("keyup", (ev) => {
      const k = ev.code as KeyBoardKeyCode;
      if (k in this.keyboardState) {
        this.keyboardState[k].pressed = false;
      }
    });

    // mouse
    window.addEventListener("mousedown", (ev) => {
      const k = this.mouseMap[ev.button];
      if (k) this.keyboardState[k].pressed = true;
    });
    window.addEventListener("mouseup", (ev) => {
      const k = this.mouseMap[ev.button];
      if (k) {
        const btn = this.keyboardState[k];
        btn.pressed = false;
        btn.touched = true;
      }
    });
  }

  private static updateGamepadState() {
    this.gamepad = navigator.getGamepads()[0] || null;
  }

  /** Returns an array of current button states (gamepad or keyboard) */
  public static getController(): Record<number, any> {
    this.initialize();
    this.updateGamepadState();

    if (this.gamepad) {
      let buttons: Record<number, any> = {};
      this.gamepad.buttons.map((b, i) => {
        buttons[i] = {
          value: i as GAMEPED_MAPPED_KEY,
          pressed: b.pressed,
          touched: b.touched ?? false,
        };
      });

      return buttons;
    } else {
      let buttons: Record<number, any> = {};
      Object.values(this.keyboardState).map((e) => {
        buttons[e.value] = e;
      });
      return buttons;
    }
  }
}
