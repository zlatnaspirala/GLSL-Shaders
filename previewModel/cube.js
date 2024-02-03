import * as matrixEngine from "matrix-engine";
import {byId, scriptManager} from "matrix-engine/lib/utility";
let OSCILLATOR = matrixEngine.utility.OSCILLATOR;

export var runThis = (world, shaderPath) => {

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  addEventListener("ray.hit.event", function(e) {
    e.detail.hitObject.LightsData.ambientLight.r =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    e.detail.hitObject.LightsData.ambientLight.g =
      matrixEngine.utility.randomFloatFromTo(0, 2);
    e.detail.hitObject.LightsData.ambientLight.b =
      matrixEngine.utility.randomFloatFromTo(0, 2);
     console.info(e.detail);
  });

  var textuteImageSamplers = {
    source: ["assets/textures/1.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers);

  var PREVENT_DOUBLE_CLICK = false;

  byId('compileBtn').addEventListener('click', () => {
    if(byId('compileBtn').disabled == false) {
      PREVENT_DOUBLE_CLICK = true;
      byId('compileBtn').disabled = true;
      byId('custom-circle-shader-fs').remove();
      scriptManager.LOAD(byId('myShader').value, "custom-circle-shader-fs", "x-shader/x-fragment", "shaders", () => {
        App.scene.MyCubeTex.shaderProgram = world.initShaders(world.GL.gl, 'custom-circle' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
        setTimeout(() => {
          PREVENT_DOUBLE_CLICK = false;
          byId('compileBtn').disabled = false;
        }, 1000)
      })
    }
  })
  // load direct from glsl file.
  var promiseMyShader = scriptManager.loadGLSL(shaderPath)
  promiseMyShader.then((d) => {
    scriptManager.LOAD(d, "custom-circle-shader-fs", "x-shader/x-fragment", "shaders", () => {
      App.scene.MyCubeTex.shaderProgram = world.initShaders(world.GL.gl, 'custom-circle' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
    })

    byId('myShader').value = d;
  })

  // IMPORTANT - override draw func for `App.scene.MyCubeTex`.
  App.scene.MyCubeTex.type = "custom-";

  var osc_variable = new OSCILLATOR(1, 300, 0.04);

  App.scene.MyCubeTex.rotation.rotationSpeed.z = 70;
  App.scene.MyCubeTex.LightsData.ambientLight.set(0.1, 1, 0.1);
  var now = 1, time1 = 0, then1 = 0;

  App.scene.MyCubeTex.addExtraDrawCode = function(world, object) {
    now = Date.now();
    now *= 0.00001;
    const elapsedTime = Math.min(now - then1, 0.1);
    time1 += elapsedTime;
    then1 = time1;

    // Engine loads resolutionLocation, TimeDelta ... 
    world.GL.gl.uniform2f(object.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    world.GL.gl.uniform1f(object.shaderProgram.TimeDelta, time1);
    world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    world.GL.gl.uniform3f(object.shaderProgram.iMouse, App.sys.MOUSE.x, App.sys.MOUSE.y, (App.sys.MOUSE.PRESS != false ? 1 : 0));
  }

  App.scene.MyCubeTex.drawCustom = function(o) {
    return matrixEngine.standardMEShaderDrawer(o);
  }

  // GOOD
  // App.updateBeforeDraw.push({
  //   UPDATE: () => {
  //     App.scene.MyCubeTex.LightsData.ambientLight.r = oscilltor_variable.UPDATE();
  //     App.scene.MyCubeTex.LightsData.ambientLight.b = oscilltor_variable.UPDATE();
  //   }
  // });

};