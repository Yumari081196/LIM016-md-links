#!/usr/bin/env node
const mdLinks = require('./index.js');
const argumentos = process.argv;

const path = argumentos[2];
const options = argumentos.slice(3, argumentos.length);

if(argumentos.length===2){
	console.log('No arguments in terminal');
} else if(argumentos.length===3){
	mdLinks(path).then((el) => console.log(el)).catch((error) => console.log(error));
} else if(argumentos.length===4){
	if(options[0]==='--validate'){
		mdLinks(path,{validate:true}).then((el) => console.log(el)).catch((error) => console.log(error));
	}else if(options[0]==='--stats'){
		mdLinks(path,{validate:true}).then((el) => console.log(el.length)).catch((error) => console.log(error));
	}else{
		console.log(new TypeError('No valid options'));
	}
} else if(argumentos.length===5){
	if(options.includes('--validate') && options.includes('--stats')){
		mdLinks(path).then((el) => console.log(el.length)).catch((error) => console.log(error));
	} else{
		console.log(new TypeError('No valid options'));
	}
} else {
	console.log('No valid arguments in the terminal');
}


