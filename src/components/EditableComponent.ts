import { Component, eventBus } from "@/core";

export class EditableComponent extends Component {
  onClick() {
    eventBus.emit("object:select", this.entity);
  }
}
