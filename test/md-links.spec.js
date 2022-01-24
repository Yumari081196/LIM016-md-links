/* eslint-disable no-undef */
const {
  checkExistPath,
  returnPathInAbsolute,
  checkFile,
  filterFilesMD,
  readContentDir,
// eslint-disable-next-line import/extensions
} = require('../lib/api.js');

const pathInAbsolute = 'C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba';
const pathInRelative = './txt_prueba';
describe('checkExistPath', () => {
  it('deberia votar true o false', () => {
    expect(checkExistPath(pathInAbsolute)).toBe(true);
  });
});

describe('convertToAbsolute', () => {
  it('deberia devolver la ruta convertida en absoluta', () => {
    expect(returnPathInAbsolute(pathInRelative)).toBe('C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba');
  });
  it('deberia devolver la ruta convertida en absoluta', () => {
    expect(returnPathInAbsolute(pathInAbsolute)).toBe('C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba');
  });
});

describe('checkFile', () => {
  it('deberia devolver un boleano verfiicando si es archivo o no', () => {
    expect(checkFile('txt_prueba/prueba.md')).toBe(true);
  });
});

describe('readContenDirectory', () => {
  it('deberia devolver un string diciendo que eldirectorio esta vacio', () => {
    expect(readContentDir('carpetaVacia')).toBe('Esta carpeta esta vacía');
  });

  it('deberia devolver un array con los archicos del directorio', () => {
    expect(readContentDir('txt_prueba')).toEqual(['txt_prueba\\prueba.md', 'txt_prueba\\pruebaText.txt']);
  });
});
describe('filterFilesMD', () => {
  it('deberia devolver un string diciendo que el input no contiene archivos md', () => {
    expect(filterFilesMD(readContentDir('imagenes'))).toBe('La ruta ingresada no es(o no contiene) archivo(s) con extension .md');
  });

  it('deberia devolver un array con los archicos del directorio que tienen extension md', () => {
    expect(filterFilesMD(readContentDir('txt_prueba'))).toEqual(['txt_prueba\\prueba.md']);
  });
});
/* const mdLinks = require('../');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */
