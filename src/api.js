const fs = require('fs');
const path = require('path');
const showdown = require('showdown');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

// Verificamos la existencia del path, return true or false
const checkExistPath = (route) => fs.existsSync(route);

// Verificamos si la ruta es absoluta, y sino la convertimos
// eslint-disable-next-line max-len
const returnPathInAbsolute = (route) => (path.isAbsolute(route) ? route : path.join(process.cwd(), route));

// Devolvemos informacion sobre el archivo o directorio con fs.statSync(input);
// Verificamos si es archivo, return ture or false
const checkFile = (input) => fs.statSync(input).isFile();

// Leyendo archivos de una carpeta
const readContentDir = (directory) => {
  const content = fs.readdirSync(directory);
  if (content.length === 0) {
    return 'Esta carpeta esta vacía';
  }
  const arrayContent = [];
  content.forEach((element) => {
    arrayContent.push(path.resolve(directory, element));
  });
  return arrayContent;
};

// filtrar archivos md
const filterFilesMD = (listFiles) => {
  const arrayFilesMd = listFiles.filter(
    (element) => path.extname(element) === '.md',
  );
  if (arrayFilesMd.length === 0) {
    return 'La ruta ingresada no es(o no contiene) archivo(s) con extension .md';
  }
  return arrayFilesMd;
};

// Leemos la ruta ingresada y leemos sus elementos para retornar solo los archivos con extension md
const checkAndGetMdFiles = (inputPath) => {
  let arrayFilesMd = [];
  // Verificamos si es un directorio, return true or false
  if (fs.statSync(inputPath).isDirectory()) {
    const contentDirectory = readContentDir(inputPath); // esto retorna un mensaje si esta vacio
    // Verificamos si tiene elementos o no
    if (Array.isArray(contentDirectory)) {
      contentDirectory.forEach((elmntDir) => {
        const contentElemnt = checkAndGetMdFiles(elmntDir);
        if (Array.isArray(contentElemnt)) {
          arrayFilesMd = arrayFilesMd.concat(contentElemnt);
        }
      });
      return filterFilesMD(arrayFilesMd);
    }
    return contentDirectory;
  }
  arrayFilesMd.push(inputPath);
  return filterFilesMD(arrayFilesMd);
};

const converter = new showdown.Converter();

const readContentMdFile = (inputFile) => {
  // leeremos contenido del archivo md
  const contentFile = fs.readFileSync(inputFile).toString();
  // Transformamos el contenido en entrada html
  // los links contenido en los archivos .md se convertiran en etiquetas de ancla
  const contentHTML = converter.makeHtml(contentFile);
  // Una vez encapsulado todo en etiquetas de html lo convertimos en documento HTML
  const dom = new JSDOM(contentHTML);

  const arrayOfTagsA = dom.window.document.querySelectorAll('a');
  const arrayInfoLinks = [];
  arrayOfTagsA.forEach((element) => {
    arrayInfoLinks.push({
      href: element.href,
      text: element.textContent.slice(0, 50),
      file: inputFile,
    });
  });
  return arrayInfoLinks;
};

module.exports = {
  checkExistPath,
  returnPathInAbsolute,
  checkFile,
  checkAndGetMdFiles,
  filterFilesMD,
  readContentDir,
  readContentMdFile,
};
