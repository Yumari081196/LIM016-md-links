#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const { mdLinks } = require('./md-Links');

const argumentos = process.argv;

const path = argumentos[2];
const options = argumentos.slice(3, argumentos.length);

// Mostrar un banner con un mensaje formado por caracteres.
const banner = figlet.textSync('md-links', {
  font: 'ANSI shadow',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 70,
});

const help = '** Usage: md-links <command> [options] \n where <command> is the path to file \n and [options] is one of : --validate, --stats, --validate --stats \n md-links <command> --validate  returns: file, href, status, ok, text \n md-links <command> --stats  returns: Total links, total Unique links \n md-links <command> --validate --stats  returns: Total links, total Unique links, broken links ** \n Puede ingresar a estas instrucciones mediante md-links help';

if (argumentos.length === 2) { // cuando solo ingresemos md-links en la terminal
  console.log(`${chalk.bold.magenta.bgBlue(banner)}\n${chalk.dim.yellow(help)}`);
} else if (argumentos.length === 3) { // cuando ingresemos md-links [y algo mas]
  if (path === 'help') { // en el caso de uqe fuese hel
    console.log(`${chalk.bold.magenta.bgBlue(banner)}\n${chalk.dim.yellow(help)}`);
  } else {
    mdLinks(path).then((el) => { // si fuese un path se ira a then o si fuese otra osa se ira a catc
      console.log(`${chalk.bold.magenta.bgBlue(banner)}\n`);
      el.forEach((elemento) => {
        const text = chalk.blue(elemento.text);
        const href = chalk.underline.greenBright(elemento.href);
        const file = chalk.bold.magenta(elemento.file.replace(process.cwd(), '.'));

        console.log(`${file} ${href} ${text}`);
      });
    }).catch((error) => console.log(chalk.bold.white.bgRed(error)));
  }
} else if (argumentos.length === 4) { // si ingresara md-links <path> [option]
  if (options[0] === '--validate') {
    mdLinks(path, { validate: true }).then((el) => {
      console.log(`${chalk.bold.magenta.bgBlue(banner)}\n`);
      el.forEach((elemento) => {
        const text = chalk.blue(elemento.text);
        const href = chalk.underline.greenBright(elemento.href);
        const file = chalk.bold.magenta(elemento.file.replace(process.cwd(), '.'));
        const { OK } = elemento;
        const status = chalk.redBright(elemento.status);

        console.log(`${file} ${href} ${OK} ${status} ${text}`);
      });
    }).catch((error) => console.log(chalk.bold.white.bgRed(error)));
  } else if (options[0] === '--stats') {
    mdLinks(path, { validate: true }).then((el) => {
      const total = `Total: ${el.length}`;

      const links = el.map((obj) => obj.href);
      const uniqueLinks = links.filter((item, index) => links.indexOf(item) === index);
      const unique = `Unique: ${uniqueLinks.length}`;

      console.log(`${chalk.bold.magenta.bgBlue(banner)}\n${total}\n${unique}`);
    }).catch((error) => console.log(chalk.bold.white.bgRed(error)));
  } else {
    console.log(new TypeError('No valid options'));
  }
} else if (argumentos.length === 5) {
  if (options.includes('--validate') && options.includes('--stats')) {
    mdLinks(path, { validate: true }).then((el) => {
      const total = `Total: ${el.length}`;

      const links = el.map((obj) => obj.href);
      const uniqueLinks = links.filter((item, index) => links.indexOf(item) === index);
      const unique = `Unique: ${uniqueLinks.length}`;

      const arrayStatus = [];
      el.forEach((item) => arrayStatus.push(item.status));
      const brokenLinks = arrayStatus.filter((elmnt) => elmnt < 200 || elmnt >= 400);
      const broken = `Broken: ${brokenLinks.length}`;

      console.log(`${chalk.bold.magenta.bgBlue(banner)}\n${total}\n${unique}\n${broken}`);
    }).catch((error) => console.log(chalk.bold.white.bgRed(error)));
  } else {
    console.log(new TypeError('No valid options'));
  }
} else {
  console.log(argumentos);
  console.log(chalk.bold.white.bgRed('No valid arguments in the terminal'));
}
