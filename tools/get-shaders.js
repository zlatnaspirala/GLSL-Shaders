var fs = require("fs");
var path = require('path');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir)
  for (const file of fileList) {
    let name = `${dir}/${file}`
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files)
    } else {
      name = name.replace('../', './')
      files.push(name)
    }
  }
  return files
}

var LIST_OFF_ALL_VISUAL_DIR = getDirectories("../shaders");
var ALL_OF = [], local__x = 0;
for(var i in LIST_OFF_ALL_VISUAL_DIR) {
  local__x++;
  val = LIST_OFF_ALL_VISUAL_DIR[i];
  if((local__x + 1) == LIST_OFF_ALL_VISUAL_DIR.length) {
    ALL_OF.push( getFiles("../shaders/" +LIST_OFF_ALL_VISUAL_DIR[i]) )
  } else {
    ALL_OF.push( getFiles("../shaders/" +LIST_OFF_ALL_VISUAL_DIR[i]) )
  }
}

console.log("ALL_OF : ", ALL_OF);

function CreateFile(path_, CONTENT) {
  fs.writeFile(path_, CONTENT, function(err) {
    if(err) {
      return console.log(err);
    } else {
      console.log("   ");
      console.log("The build file was created DONE.");
      console.log("   ");
    }
  });
}

function READ(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
      if(!err) {
        TEST += "\n" + data;
        resolve('good');
      } else {
        reject();
        console.log("ERROR IN BUILD : ", err);
      }
    });
  });
}