import { Engine, eventBus } from "@/engine";

import { Camera } from "@/engine/core";
import { CanvasRenderer } from "@/engine/core";

import { EntityManager, SceneManager } from "@/engine/managers";

import {
  EventSystem,
  InputSystem,
  SceneSystem,
  RenderSystem,
  CollisionSystem,
} from "@/engine/systems";

import { MenuScene, WorldScene } from "@/game/scenes";
import { X_SCREEN_SIZE, Y_SCREEN_SIZE } from "@/game/constants";
import { PlayerCharacter } from "./game/models/characters";

const canvas = document.getElementById("world") as HTMLCanvasElement;

canvas.width = X_SCREEN_SIZE;
canvas.height = Y_SCREEN_SIZE;

const engine = new Engine();

const em = new EntityManager();
em.addEntity(new PlayerCharacter());

const sceneManager = new SceneManager(em);

const camera = new Camera(canvas.width, canvas.height, 2000, 2000, 0.2);

// sceneManager.register("menu", new MenuScene());
// sceneManager.register("world", new WorldScene());

// // Load the initial scene
// sceneManager.load("menu");

// 4) Register all systems in the order you want them to run
engine
  // .registerSystem(new EventSystem()) // flushes queued events
  .registerSystem(new InputSystem()) // polls input
  .registerSystem(new CollisionSystem()) // detects & queues collisions
  // .registerSystem(new SceneSystem(sceneManager)) // updates active scene (init/update/render)
  .registerSystem(new RenderSystem(em, camera)) // issues draw commands into bus
  .registerSystem(new CanvasRenderer(canvas)); // drains render queue onto the <canvas>

// 5) Start the engine loop
engine.start();

// 6) Anywhere in your code (UI button, keyboard shortcut, etc.), switch scenes:
eventBus.on("ui:startGame", () => sceneManager.load("world"));
eventBus.on("ui:backToMenu", () => sceneManager.load("menu"));
