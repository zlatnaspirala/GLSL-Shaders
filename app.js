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

  window.dropShaderList = (a) => {
    document.getElementById("myDropdown" + a).classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if(!event.target.matches('.dropbtn1')) {
      var dropdowns = document.getElementsByClassName("dropdown-content1");
      var i;
      for(i = 0;i < dropdowns.length;i++) {
        var openDropdown = dropdowns[i];
        if(openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
    if(!event.target.matches('.dropbtn2')) {
      var dropdowns = document.getElementsByClassName("dropdown-content2");
      var i;
      for(i = 0;i < dropdowns.length;i++) {
        var openDropdown = dropdowns[i];
        if(openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

}

window.addEventListener("load", () => {
  matrixEngine.Engine.initApp(webGLStart);
}, false);
