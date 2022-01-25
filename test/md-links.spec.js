/* eslint-disable no-undef */
const {
	checkExistPath,
	returnPathInAbsolute,
	checkFile,
	filterFilesMD,
	readContentDir,
	checkAndGetMdFiles,
	readContentMdFile,
} = require('../src/api.js');

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
		expect(readContentDir('txt_prueba')).toEqual(['C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\archivoVacio.md', 'C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md', 'C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\pruebaText.txt']);
	});
});
describe('filterFilesMD', () => {
	it('deberia devolver un string diciendo que el input no contiene archivos md', () => {
		expect(filterFilesMD(readContentDir('imagenes'))).toBe('La ruta ingresada no es(o no contiene) archivo(s) con extension .md');
	});

	it('deberia devolver un array con los archicos del directorio que tienen extension md', () => {
		expect(filterFilesMD(readContentDir('txt_prueba'))).toEqual(['C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\archivoVacio.md', 'C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md']);
	});
});

describe('checkAndGetMdFiles', () => {
	it('deberia devolver un array con los archivos md que encuentra en el path', () => {
		expect(checkAndGetMdFiles(pathInAbsolute)).toEqual(['C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\archivoVacio.md', 'C:\\Users\\Cruz\\Desktop\\alexa\\Codigos Js , Html, Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md']);
	});

	it('deberia devolver un array con los archivos md que encuentra en el path', () => {
		expect(checkAndGetMdFiles('C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba/archivoVacio.md')).toEqual(['C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba/archivoVacio.md']);
	});
});

describe('readContentMdFile', () => {
	it('deberia devolver un array de objetos con las caracteristas de los link', () => {
		expect(readContentMdFile('C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba/prueba.md')).toEqual([{'file': 'C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba/prueba.md','href': 'https://norfipcyu.com/page1', 'text': 'joi.dev'}, {'file': 'C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba/prueba.md', 'href': 'https://joi.dev/api/', 'text': 'Documentation and API'}, {'file': 'C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba/prueba.md', 'href': 'https://joi.dev/resources/status/#joi', 'text': 'Versions status'}, { 'file': 'C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba/prueba.md', 'href': 'https://joi.dev/resources/changelog/', 'text': 'Changelog'}, { 'file': 'C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba/prueba.md', 'href': 'https://joi.dev/policies/', 'text': 'Project policies'}]);
	});

	it('deberia devolver un array de objetos con las caracteristas de los link', () => {
		expect(readContentMdFile('C:/Users/Cruz/Desktop/alexa/Codigos Js , Html, Css/cifradoCesar/md_links/LIM016-md-links/txt_prueba/archivoVacio.md')).toEqual([]);
	});
});
/* const mdLinks = require('../');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */
