const fs = require("fs");
const path = require("path");

// Verificamos la existencia del path, return true or false
const checkExistPath = (path) => fs.existsSync(path);

// Verificamos si la ruta es absoluta, y sino la convertimos
const convertToAbsolute = (route) => path.isAbsolute(route) ? route : path.resolve(route);

// Devolvemos informacion sobre el archivo o directorio con fs.statSync(input);
// Verificamos si es archivo, return ture or false
const checkFile = (input) => fs.statSync(input).isFile();

//Verificamos si es un directorio, return true or false
const checkDirectory = (input) => fs.statSync(input).isDirectory();

// Leyendo archivos de una carpeta (sin leer su contenido)
const readContentDir = (directory) => {
  const content = fs.readdirSync(directory);
  if (content.length==0) {
    return 'Esta carpeta esta vacía';
  } else {
    return content;
  }
}

// filtrar archivos md
const filterFilesMD = (listFiles) => {
  const arrayFilesMd = listFiles.filter(element => path.extname(element)==='.md');
  if (arrayFilesMd.length == 0){;
    return 'ESta carpeta no contiene archivos md'
  } else {
    return arrayFilesMd;
  }
};

module.exports = {
  checkExistPath,
  convertToAbsolute,
  checkFile,
  checkDirectory,
  filterFilesMD,
  readContentDir,
};
