#!/usr/bin/env node

const mdLinks = require('./md-Links.js');
const argumentos = process.argv;

const path = argumentos[2];
const options = argumentos.slice(3, argumentos.length);

if(argumentos.length===2){
	const help = 'Usage: md-links <command> [options] \n where <command> is the path to file \n and [options] is one of : --validate, --stats, --validate --stats \n md-links <command> --validate  returns: file, href, status, ok, text \n md-links <command> --stats  returns: Total links, total Unique links \n md-links <command> --validate --stats  returns: Total links, total Unique links, broken links';
	console.log(help);

} else if(argumentos.length===3){
	mdLinks(path).then((el) => console.log(el)).catch((error) => console.log(error));

} else if(argumentos.length===4){
	if(options[0]==='--validate'){
		mdLinks(path,{validate:true}).then((el) => {
			el.forEach(elemento => {
				const text = elemento.text;
				const href = elemento.href;
				const file = elemento.file.replace(process.cwd(),'.');
				const OK = elemento.OK;
				const status = elemento.status;

				console.log(file+'   '+href+'   ' +OK+'   ' +status+'   ' +text);
			});
		}).catch((error) => console.log(error));

	}else if(options[0]==='--stats'){
		mdLinks(path,{validate:true}).then((el) => {
			const total = 'Total: '+el.length;

			const links = el.map((obj) => obj.href);
			const uniqueLinks = links.filter((item, index) => links.indexOf(item) === index);
			const unique = 'Unique: '+ uniqueLinks.length;

			console.log(total+'\n'+unique);
		}).catch((error) => console.log(error));

	}else{
		console.log(new TypeError('No valid options'));
	}

} else if(argumentos.length===5){
	if(options.includes('--validate') && options.includes('--stats')){
		mdLinks(path,{validate:true}).then((el) => {
			const total = 'Total: '+el.length;

			const links = el.map((obj) => obj.href);
			const uniqueLinks = links.filter((item, index) => links.indexOf(item) === index);
			const unique = 'Unique: '+ uniqueLinks.length;

			let arrayStatus=[];
			el.forEach((item) => arrayStatus.push(item.status));
			const brokenLinks =  arrayStatus.filter((elmnt) => parseInt(elmnt)<200 || parseInt(elmnt) >=400);
			const broken = 'Broken: ' + brokenLinks.length;

			console.log(total+'\n'+unique+'\n'+broken);
		}).catch((error) => console.log(error));

	} else{
		console.log(new TypeError('No valid options'));
	}
} else {
	console.log('No valid arguments in the terminal');
}


