const {
  checkExistPath,
  returnPathInAbsolute,
  checkAndGetMdFiles,
  readContentMdFile,
// eslint-disable-next-line import/extensions
} = require('./api.js');

// Obetner links de directorio o archivo
const getLinks = (contentPath) => new Promise((resolve, reject) => {
  if (Array.isArray(contentPath)) {
    const arrLinks = contentPath.map((elem) => readContentMdFile(elem));
    const newArr = [];
    arrLinks.forEach((element) => {
      element.forEach((elem) => {
        newArr.push(elem);
      });
    });
    resolve(newArr);
  } else {
    reject(contentPath);
  }
});

// funcion md-links
const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (checkExistPath(path)) {
    // verificamos si la ruta ingresada existe o no
    const pathInAbsolute = returnPathInAbsolute(path);
    if (options !== undefined && options.validate === true) {
      console.log('hola');
    } else {
      const contentPath = checkAndGetMdFiles(pathInAbsolute);
      getLinks(contentPath)
        .then((el) => resolve(el))
        .catch((error) => reject(error));
    }
  } else {
    reject(new Error('no existe la ruta ingresada'));
  }
});
// });
mdLinks('./imagenes')
  .then((element) => console.log(element))
  .catch((element) => console.log(element));
mdLinks('carpetaSinFilesMd')
  .then((element) => console.log(element))
  .catch((element) => console.log(element));
mdLinks('txt_prueba/prueba.md', { validate: true })
  .then((element) => console.log(element))
  .catch((element) => console.log(element));
mdLinks('carpetaVacia')
  .then((element) => console.log(element))
  .catch((element) => console.log(element));

// mdLinks('C:/Users/Cruz/Desktop/alexa/Codigos
// Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba/prueba.md','');
