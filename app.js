import * as matrixEngine from "matrix-engine";
import {runThis} from "./previewModel/cube";

var world;
var App = matrixEngine.App;
window.App = App;
window.world = world;
window.matrixEngine = matrixEngine;

function webGLStart() {
  world = matrixEngine.matrixWorld.defineworld(canvas, "simply");
  runThis(world);
  world.callReDraw();
}

window.addEventListener("load", () => {
  matrixEngine.Engine.initApp(webGLStart);
}, false);
