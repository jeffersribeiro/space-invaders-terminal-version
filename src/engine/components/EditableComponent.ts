import { Component } from "../core";
import { eventBus } from "../EventBus";

export class EditableComponent extends Component {
  onClick() {
    eventBus.emit("object:select", this.entity);
  }
}
