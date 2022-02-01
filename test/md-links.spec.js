const {
  validateLinks,
  getLinks,
  mdLinks,
} = require('../src/md-Links');

const processCwd = process.cwd();

const objetosEjemplos = [
  {
    href: 'https://norfipcyu.com/page1',
    text: 'Yum',
    file: 'C:\\Users\\Cruz\\Desktop\\alexa\\CodigosJs,Html,Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md',
  },
  {
    href: 'https://joi.dev/resources/changelog/',
    text: 'Changelog',
    file: 'C:\\Users\\Cruz\\Desktop\\alexa\\CodigosJs,Html,Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md',
  },
  {
    href: 'https://joi.dev/policies/',
    text: 'Project policies',
    file: 'C:\\Users\\Cruz\\Desktop\\alexa\\CodigosJs,Html,Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md',
  },
];
const objetosEjemplos2 = [
  {
    href: 'https://norfipcyu.com/page1',
    OK: 'FAIL',
    status: 404,
    text: 'Yum',
    file: 'C:\\Users\\Cruz\\Desktop\\alexa\\CodigosJs,Html,Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md',
  },
  {
    href: 'https://joi.dev/resources/changelog/',
    OK: 'OK',
    status: 200,
    text: 'Changelog',
    file: 'C:\\Users\\Cruz\\Desktop\\alexa\\CodigosJs,Html,Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md',
  },
  {
    href: 'https://joi.dev/policies/',
    OK: 'OK',
    status: 200,
    text: 'Project policies',
    file: 'C:\\Users\\Cruz\\Desktop\\alexa\\CodigosJs,Html,Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md',
  },
];

describe('validateLinks', () => {
  it('deberia retornar', () => validateLinks(objetosEjemplos).then((el) => {
    expect(el).toEqual([{
      OK: 'FAIL', file: 'C:\\Users\\Cruz\\Desktop\\alexa\\CodigosJs,Html,Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md', href: 'https://norfipcyu.com/page1', status: 404, text: 'Yum',
    }, {
      OK: 'OK', file: 'C:\\Users\\Cruz\\Desktop\\alexa\\CodigosJs,Html,Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md', href: 'https://joi.dev/resources/changelog/', status: 200, text: 'Changelog',
    }, {
      OK: 'OK', file: 'C:\\Users\\Cruz\\Desktop\\alexa\\CodigosJs,Html,Css\\cifradoCesar\\md_links\\LIM016-md-links\\txt_prueba\\prueba.md', href: 'https://joi.dev/policies/', status: 200, text: 'Project policies',
    }]);
  }));
});

describe('getLinks', () => {
  it('deberia retornar ', () => getLinks([`${process.cwd()}/txt_prueba/prueba.md`]).then((el) => {
    expect(el).toEqual([{ file: `${processCwd}/txt_prueba/prueba.md`, href: 'https://norfipcyu.com/page1', text: 'Yum' }, { file: `${processCwd}/txt_prueba/prueba.md`, href: 'https://joi.dev/resources/changelog/', text: 'Changelog' }, {
      file:
            `${processCwd}/txt_prueba/prueba.md`,
      href: 'https://joi.dev/policies/',
      text: 'Project policies',
    }]);
  }));

  it('falla con un error', () => {
    expect.assertions(1);
    return getLinks('hola').catch((e) => expect(e).toEqual('hola'));
  });
});

describe('mdLinks', () => {
  it('deberia retornar ', () => mdLinks('./txt_prueba/prueba.md').then((el) => {
    expect(el).toEqual(objetosEjemplos);
  }));
  it('falla con un error', () => {
    expect.assertions(1);
    return mdLinks('./carpetaVacia', { validate: true }).catch((e) => expect(e).toBe('Esta carpeta esta vacía'));
  });

  it('deberia retornar ', () => mdLinks('./txt_prueba/prueba.md', { validate: true }).then((el) => {
    expect(el).toEqual(objetosEjemplos2);
  }));
  it('falla con un error', () => {
    expect.assertions(1);
    return mdLinks('./carpetaVacia').catch((e) => expect(e).toBe('Esta carpeta esta vacía'));
  });

  it('falla con un error', () => {
    expect.assertions(1);
    return mdLinks('./hola').catch((e) => expect(e).toBe('Ruta ingresada no valida o no existente'));
  });
});
