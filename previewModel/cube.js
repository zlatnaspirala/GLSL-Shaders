import * as matrixEngine from "matrix-engine";
import {byId, scriptManager} from "matrix-engine/lib/utility";
import {geometryLines} from "../assets/matrix-shaders-params/geometry-lines";
let OSCILLATOR = matrixEngine.utility.OSCILLATOR;

export var runThis = (world, shaderPath) => {

  // Test loading 2d plot data from unifroms.
  var myshaderDrawData = geometryLines.charI;
 //  alert(myVectorJS)

  App.loadCircleBase = (shaderPath) => {
    console.log("audios 2")
    // var p = document.getElementById('hoverFX').play()
    // load direct from glsl file.
    if (byId('custom-circle-shader-fs')) byId('custom-circle-shader-fs').remove();
    var promiseMyShader = scriptManager.loadGLSL(shaderPath)
    
    promiseMyShader.then((d) => {
      scriptManager.LOAD(d, "custom-circle-shader-fs", "x-shader/x-fragment", "shaders", () => {
        App.scene.MyCubeTex.shaderProgram = world.initShaders(world.GL.gl, 'custom-circle' + '-shader-fs', 'cubeLightTex' + '-shader-vs');
        // add own uniforms...
        App.scene.MyCubeTex.shaderProgram.XXX = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "iXXX");
        App.scene.MyCubeTex.shaderProgram.R = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "iR");
        App.scene.MyCubeTex.shaderProgram.G = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "iG");
        App.scene.MyCubeTex.shaderProgram.B = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "iB");
        App.scene.MyCubeTex.shaderProgram.iAppStatus = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "iAppStatus");

        App.scene.MyCubeTex.shaderProgram.myshaderDrawData = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "myshaderDrawData");
        
      })
      byId('myShader').value = d;
    })
  }

  canvas.addEventListener('mousedown', (ev) => {
    console.log(ev)
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

  // squareTex
  world.Add("cubeLightTex", 1, "MyCubeTex", {
    source: ["assets/textures/1.png"],
    mix_operation: "multiply",
  });

  byId('compileBtn').addEventListener('click', () => {
    if(byId('compileBtn').disabled == false) {
      var p = document.getElementById('hoverFX').play();
      byId('compileBtn').disabled = true;
      byId('custom-circle-shader-fs').remove();
      scriptManager.LOAD(byId('myShader').value, "custom-circle-shader-fs", "x-shader/x-fragment", "shaders", () => {
        App.scene.MyCubeTex.shaderProgram = world.initShaders(world.GL.gl, 'custom-circle' + '-shader-fs', 'cubeLightTex' + '-shader-vs');

        // add own uniforms...
        App.scene.MyCubeTex.shaderProgram.XXX = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "iXXX");
        App.scene.MyCubeTex.shaderProgram.R = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "iR");
        App.scene.MyCubeTex.shaderProgram.G = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "iG");
        App.scene.MyCubeTex.shaderProgram.B = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "iB");
        App.scene.MyCubeTex.shaderProgram.iAppStatus = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "iAppStatus");

        App.scene.MyCubeTex.shaderProgram.myshaderDrawData = world.GL.gl.getUniformLocation(App.scene.MyCubeTex.shaderProgram, "myshaderDrawData");

        setTimeout(() => {
          byId('compileBtn').disabled = false;
        }, 1600)
      })
    }
  })


  App.scene.MyCubeTex.SHADER_APP_STATUS = 0;

  App.loadCircleBase(shaderPath)

  // IMPORTANT - override draw func for `App.scene.MyCubeTex`.
  App.scene.MyCubeTex.type = "custom-";

  var osc_r = new OSCILLATOR(0, 2, 0.001);
  var osc_g = new OSCILLATOR(0, 1, 0.001);
  var osc_b = new OSCILLATOR(0, 0.1, 0.01);
  var osc_variable = new OSCILLATOR(0, 150, 1);

  // App.scene.MyCubeTex.glBlend.blendEnabled = true
  // App.scene.MyCubeTex.rotation.rotationSpeed.y = 10;

  byId('ambientLightR').addEventListener('change', (e) => {
    console.log(e.target.value)
    App.scene.MyCubeTex.LightsData.ambientLight.r =e.target.value;
  })
  byId('ambientLightG').addEventListener('change', (e) => {
    console.log(e.target.value)
    App.scene.MyCubeTex.LightsData.ambientLight.g =e.target.value;
  })
  byId('ambientLightB').addEventListener('change', (e) => {
    console.log(e.target.value)
    App.scene.MyCubeTex.LightsData.ambientLight.b =e.target.value;
  })
  App.scene.MyCubeTex.LightsData.ambientLight.set(1, 1, 1);
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
    
    world.GL.gl.uniform1f(object.shaderProgram.XXX, osc_variable.UPDATE())

    world.GL.gl.uniform1f(object.shaderProgram.R, osc_r.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.G, osc_g.UPDATE())
    world.GL.gl.uniform1f(object.shaderProgram.B, osc_b.UPDATE())

    world.GL.gl.uniform1i(object.shaderProgram.iAppStatus, App.scene.MyCubeTex.SHADER_APP_STATUS)
    world.GL.gl.uniform1fv(object.shaderProgram.myshaderDrawData, myshaderDrawData, 0, 4)
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