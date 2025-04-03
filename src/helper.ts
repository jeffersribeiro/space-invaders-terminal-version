export class Helper {
  generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const random = (Math.random() * 16) | 0;
      const value = c === "x" ? random : (random & 0x3) | 0x8; // 4 in the version spot
      return value.toString(16);
    });
  }
}
