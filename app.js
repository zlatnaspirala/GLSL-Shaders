import * as matrixEngine from "matrix-engine";
import {runThis} from "./previewModel/cube";
import {byId} from "matrix-engine/lib/utility";

var world;
var App = matrixEngine.App;
window.App = App;
window.world = world;
window.matrixEngine = matrixEngine;

function webGLStart() {

  canvas.width = window.innerWidth / 100 * 51;
  // canvas.height = window.innerWidth / 100 * 31;

  App.resize.canvas = 'false'

  world = matrixEngine.matrixWorld.defineworld(canvas);
  byId('canvas').style.position = 'unset'
  byId('MYHOLDER').append(byId('canvas'))

  world.callReDraw();
  runThis(world, 'shaders/tutorial-circle/circle-two.glsl');
}

window.addEventListener("load", () => {
  matrixEngine.Engine.initApp(webGLStart);
}, false);
