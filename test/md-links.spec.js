const {
  checkExistPath,
  convertToAbsolute,
  checkFile,
  readContentDir,
  checkDirectory,
  filterFilesMD,
} = require('../lib/api.js');

const pathInAbsolute = 'C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba';
const pathInRelative = 'txt_prueba'
describe('checkExistPath', () => {
  it('deberia votar true o false', () => {
    expect(checkExistPath(pathInAbsolute)).toBe(true);
  })
});

describe('convertToAbsolute', () => {
  it('deberia devolver la ruta convertida en absoluta', () => {
    expect(convertToAbsolute(pathInRelative)).toBe('C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba');
  })
});

describe('checkFile', () => {
  it('deberia devolver un boleano verfiicando si es archivo o no', () => {
    expect(checkFile('txt_prueba/prueba.md')).toBe(true);
  })
});

describe('checkDirectory', () => {
  it('deberia devolver un boleano verfiicando si es driectorio o no', () => {
    expect(checkDirectory('txt_prueba')).toBe(true);
  })
});
describe('readContenDirectory', () => {
  it('deberia devolver un string diciendo que eldirectorio esta vacio', () => {
    expect(readContentDir('carpetaVacia')).toBe('Esta carpeta esta vacía')
  });

  it('deberia devolver un array con los archicos del directorio', () => {
    expect(readContentDir('txt_prueba')).toEqual(['prueba.md', 'pruebaText.txt'])
  });
});
describe('filterFilesMD', () => {
  it('deberia devolver un string diciendo que el input no contiene archivos md', () => {
    expect(filterFilesMD(readContentDir('imagenes'))).toBe('ESta carpeta no contiene archivos md')
  });

  it('deberia devolver un array con los archicos del directorio que tienen extension md', () => {
    expect(filterFilesMD(readContentDir('txt_prueba'))).toEqual(['prueba.md'])
  });
});
/* const mdLinks = require('../');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */
