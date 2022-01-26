const {
  checkExistPath,
  returnPathInAbsolute,
  checkFile,
  filterFilesMD,
  readContentDir,
  checkAndGetMdFiles,
  readContentMdFile,
} = require('../src/api');

const processCwdInput = 'C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links';
const processCwdRecvd = 'C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links';

const pathInAbsolute = 'C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba';
const pathInRelative = './txt_prueba';

describe('checkExistPath', () => {
  it('deberia votar true o false', () => {
    expect(checkExistPath(pathInAbsolute)).toBe(true);
  });
});

describe('convertToAbsolute', () => {
  it('deberia devolver la ruta convertida en absoluta', () => {
    expect(returnPathInAbsolute(pathInRelative)).toBe(pathInAbsolute);
  });
  it('deberia devolver la ruta convertida en absoluta', () => {
    expect(returnPathInAbsolute(`${processCwdInput}/txt_prueba`)).toBe(`${processCwdInput}/txt_prueba`);
  });
});

describe('checkFile', () => {
  it('deberia devolver un boleano verfiicando si es archivo o no', () => {
    expect(checkFile('./txt_prueba/prueba.md')).toBe(true);
  });
});

describe('readContenDirectory', () => {
  it('deberia devolver un string diciendo que eldirectorio esta vacio', () => {
    expect(readContentDir('./carpetaVacia')).toBe('Esta carpeta esta vacía');
  });

  it('deberia devolver un array con los archicos del directorio', () => {
    expect(readContentDir('./txt_prueba')).toEqual([`${processCwdRecvd}\\txt_prueba\\archivoVacio.md`, `${processCwdRecvd}\\txt_prueba\\prueba.md`, `${processCwdRecvd}\\txt_prueba\\prueba2.md`, `${processCwdRecvd}\\txt_prueba\\pruebaText.txt`]);
  });
});

describe('filterFilesMD', () => {
  it('deberia devolver un string diciendo que el input no contiene archivos md', () => {
    expect(filterFilesMD(readContentDir('./imagenes'))).toBe('La ruta ingresada no es(o no contiene) archivo(s) con extension .md');
  });

  it('deberia devolver un array con los archicos del directorio que tienen extension md', () => {
    expect(filterFilesMD(readContentDir('./txt_prueba'))).toEqual([`${processCwdRecvd}\\txt_prueba\\archivoVacio.md`, `${processCwdRecvd}\\txt_prueba\\prueba.md`, `${processCwdRecvd}\\txt_prueba\\prueba2.md`]);
  });
});

describe('checkAndGetMdFiles', () => {
  it('deberia devolver un mensaje diciendo que la carpeta esta vacia', () => {
    expect(checkAndGetMdFiles('./carpetaVacia')).toBe('Esta carpeta esta vacía');
  });

  it('deberia devolver un array con los archivos md que encuentra en .\\txt_prueba', () => {
    expect(checkAndGetMdFiles(pathInAbsolute)).toEqual([`${processCwdRecvd}\\txt_prueba\\archivoVacio.md`, `${processCwdRecvd}\\txt_prueba\\prueba.md`, `${processCwdRecvd}\\txt_prueba\\prueba2.md`]);
  });

  it('deberia devolver un array con los archivos md que encuentra en .\\recursividadDir1', () => {
    expect(checkAndGetMdFiles(`${processCwdRecvd}\\recursividadDir1`)).toEqual([`${processCwdRecvd}\\recursividadDir1\\archivo1.md`, `${processCwdRecvd}\\recursividadDir1\\recursividadDir2\\archivo2.md`, `${processCwdRecvd}\\recursividadDir1\\recursividadDir2\\recursividadDir3\\archivo3.md`]);
  });

  it('deberia devolver un array con los archivos md que encuentra en la ruta ingresada', () => {
    expect(checkAndGetMdFiles(`${processCwdRecvd}\\txt_prueba\\archivoVacio.md`)).toEqual([`${processCwdRecvd}\\txt_prueba\\archivoVacio.md`]);
  });
});

describe('readContentMdFile', () => {
  it('deberia devolver un array de objetos con las caracteristas de los link', () => {
    expect(readContentMdFile(`${processCwdInput}/txt_prueba/prueba.md`)).toEqual([{ file: `${processCwdInput}/txt_prueba/prueba.md`, href: 'https://norfipcyu.com/page1', text: 'Yum' }, { file: `${processCwdInput}/txt_prueba/prueba.md`, href: 'https://joi.dev/resources/changelog/', text: 'Changelog' }, { file: `${processCwdInput}/txt_prueba/prueba.md`, href: 'https://joi.dev/policies/', text: 'Project policies' }]);
  });

  it('deberia devolver un array de objetos con las caracteristas de los link', () => {
    expect(readContentMdFile(`${processCwdInput}/txt_prueba/archivoVacio.md`)).toEqual([]);
  });
});
/* const mdLinks = require('../');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */
