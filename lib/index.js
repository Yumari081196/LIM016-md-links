const {
  checkExistPath,
  convertToAbsolute,
  checkFile,
  readContentDir,
  checkDirectory,
  filterFilesMD,
} = require('./api.js');
const fs = require('fs');
// existencia de carpetas
const mdLinks = (path, options) => {
  if(checkExistPath(path)){ // verificamos si la ruta ingresada existe o no
    console.log('la ruta ingresada existe');
    if(checkDirectory(path)){
      const pathInAbsolute = convertToAbsolute(path);
      const contentDirectory = readContentDir(pathInAbsolute)
      Array.isArray(contentDirectory) ? console.log(filterFilesMD(contentDirectory)) : console.log(contentDirectory);
    } else {
      console.log(' es archivo');
    }
  } else {
    console.log('no existe ruta ingresada');
  }
};
mdLinks('imagenes')
mdLinks('carpetaSinFilesMd')
mdLinks('txt_prueba');
mdLinks('carpetaVacia')
// mdLinks('C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links','');