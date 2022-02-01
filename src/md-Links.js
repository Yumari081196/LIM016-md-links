const fetch = require('node-fetch');

const {
  checkExistPath,
  returnPathInAbsolute,
  checkAndGetMdFiles,
  readContentMdFile,
} = require('./api');

const validateLinks = (arrayObjects) => {
  const newArray = arrayObjects.map((object) => fetch(object.href)
    .then((response) => {
      if (response.status >= 200 && response.status < 400) {
        const newObject = {
          href: object.href,
          text: object.text,
          file: object.file,
          status: response.status,
          OK: response.statusText,
        };
        return newObject;
      }
      const newObject = {
        href: object.href,
        text: object.text,
        file: object.file,
        status: response.status,
        OK: 'FAIL',
      };
      return newObject;
    })
    .catch(() => {
      const newObject = {
        href: object.href,
        text: object.text,
        file: object.file,
        status: 404,
        OK: 'FAIL',
      };
      return newObject;
    }));
  return Promise.all(newArray);
};

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
    const filesMd = checkAndGetMdFiles(pathInAbsolute);
    if (options !== undefined && options.validate === true) {
      getLinks(filesMd)
        .then((el) => resolve(validateLinks(el)))
        .catch((error) => reject(error));
    } else {
      getLinks(filesMd)
        .then((el) => resolve(el))
        .catch((error) => reject(error));
    }
  } else {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('Ruta ingresada no valida o no existente');
  }
});
// entrada de la ruta
/* mdLinks('c:/Users/Cruz/Desktop/alexa/CodigosJs,Html,Css/cifradoCesar/CipherLaboratoria')
  .then((el) => {
    console.log(el);
  }).catch((el) => console.log(el)); */
module.exports = { mdLinks, getLinks, validateLinks };
