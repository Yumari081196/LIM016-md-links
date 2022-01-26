
const fetch = require('node-fetch');

const {
	checkExistPath,
	returnPathInAbsolute,
	checkAndGetMdFiles,
	readContentMdFile,
} = require('./api.js');

const validateLinks = (arrayObjects) => {
	const newArray = arrayObjects.map((object) => {
		return fetch(object.href)
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
				} else {
					const newObject = {
						href: object.href,
						text: object.text,
						file: object.file,
						status: response.status,
						OK: 'FAIL',
					};
					return newObject;
				}
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
			});
	});
	return Promise.all(newArray);
};

// Obetner links de directorio o archivo
const getLinks = (contentPath) =>
	new Promise((resolve, reject) => {
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
const mdLinks = (path, options) =>
	new Promise((resolve, reject) => {
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
			reject('Ruta ingresada no valida o no existente');
		}
	});

module.exports = { mdLinks, getLinks, validateLinks };
