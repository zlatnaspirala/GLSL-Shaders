import * as matrixEngine from "matrix-engine";
import {scriptManager} from "matrix-engine/lib/utility";
let OSCILLATOR = matrixEngine.utility.OSCILLATOR;

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["assets/textures/1.png"],
    mix_operation: "multiply",
  };

  world.Add("cubeLightTex", 1, "MyCubeTex", textuteImageSamplers);
  // load direct from glsl file.
  var promiseMyShader = scriptManager.loadGLSL('../shaders/tutorial-circle/circle.glsl')
  promiseMyShader.then((d) => {
    scriptManager.LOAD(d, "custom-circle-shader-fs", "x-shader/x-fragment", "shaders", () => {
      App.scene.MyCubeTex.shaderProgram = world.initShaders(world.GL.gl, 'custom-circle' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
    })
  })

  App.scene.MyCubeTex.type = "custom-";
  // var oscilltor_variable = new OSCILLATOR(0.1, 3, 0.004);
  App.scene.MyCubeTex.rotation.rotationSpeed.z = 70;
  App.scene.MyCubeTex.LightsData.ambientLight.set(0.1, 1, 0.1);

  App.scene.MyCubeTex.addExtraDrawCode = function(world, object) {
    now = Date.now();
    now *= 0.00001;
    const elapsedTime = Math.min(now - then1, 0.1);
    time1 += elapsedTime;
    then1 = time1;
    // world.GL.gl.uniform2f(object.shaderProgram.resolutionLocation, world.GL.gl.canvas.width, world.GL.gl.canvas.height);
    // world.GL.gl.uniform1f(object.shaderProgram.TimeDelta, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.timeLocation, time1);
    // world.GL.gl.uniform1f(object.shaderProgram.matrixSkyRad, App.scene.MyCubeTex.MY_RAD);
  }
  App.scene.ToyShader.drawCustom = function(o) {
    return standardMatrixEngineShader(o);
  }

  // GOOD
  // App.updateBeforeDraw.push({
  //   UPDATE: () => {
  //     App.scene.MyCubeTex.LightsData.ambientLight.r = oscilltor_variable.UPDATE();
  //     App.scene.MyCubeTex.LightsData.ambientLight.b = oscilltor_variable.UPDATE();
  //   }
  // });

};