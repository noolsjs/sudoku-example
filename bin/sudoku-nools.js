'use strict'; // eslint-disable-line

require('babel-register');
const sudoku = require('..');

const command = process.argv[2];
const args = process.argv.slice(3);
if (!(command in sudoku)) {
    console.error(`Unknown command ${command}`);
    console.error(`Valid commands are\n\t${Object.keys(sudoku).join('\n\t')}`);
    process.exit(1);
}

console.log(`Running ${command} ${args.join(',')}`);
sudoku[command](...args);

