import * as matrixEngine from "matrix-engine";
import {runThis} from "./previewModel/cube";

var world;
var App = matrixEngine.App;
window.App = App;
window.world = world;
window.matrixEngine = matrixEngine;

function webGLStart() {

  canvas.width = window.innerWidth / 100 * 31;
  canvas.height = window.innerWidth / 100 * 31;

  App.resize.canvas = 'false'

  world = matrixEngine.matrixWorld.defineworld(canvas);
  world.callReDraw();
  runThis(world, 'shaders/tutorial-circle/circle-base.glsl');
}

window.addEventListener("load", () => {
  matrixEngine.Engine.initApp(webGLStart);
}, false);
