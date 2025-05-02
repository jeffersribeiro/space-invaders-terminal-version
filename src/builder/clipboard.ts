export class ClipboardManager {
  private static copiedObject: any = null;

  static copy(object: any): void {
    // Deep clone (you can customize depending on your object structure)
    this.copiedObject = JSON.parse(JSON.stringify(object));
  }

  static paste(): any {
    if (!this.copiedObject) return null;

    const newObject = JSON.parse(JSON.stringify(this.copiedObject));
    // Optional: Offset to avoid pasting exactly on top of original
    newObject.position.x += 10;
    newObject.position.y += 10;

    return newObject;
  }

  static hasCopy(): boolean {
    return this.copiedObject !== null;
  }
}
