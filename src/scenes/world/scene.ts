import { X_SCREEN_SIZE, Y_SCREEN_SIZE } from "@/constants";
import { EntityManager } from "@/core";
import { RenderSystem } from "@/core/RenderSystem";
import { PlayerCharacter } from "@/models/characters";

const sceneName = "world";

const canvas = document.getElementById(sceneName) as HTMLCanvasElement;

canvas.width = X_SCREEN_SIZE;
canvas.height = Y_SCREEN_SIZE;

const context = canvas.getContext("2d");

if (!context) throw Error("Canvas context not found");

const manager = new EntityManager();
manager.addEntity(new PlayerCharacter());

const render = new RenderSystem(context, manager);
render.start();
