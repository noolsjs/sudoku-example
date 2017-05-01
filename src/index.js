import sudRepl from './repl';
import {createSudokuFlow, createValidateFlow} from './rules';
import {Sudoku} from './sudoku';
import data from './data';

function errorHandler(err) {
    console.error(err.stack);
    process.exit(1);
}

function createSudoku(dataType) {
    const sudokuFlow = createSudokuFlow({explain: false});
    const validateFlow = createValidateFlow({});
    const cellValues = data[dataType];
    return Sudoku.createFromCellValues({sudokuFlow, validateFlow, cellValues});
}

export function repl(dataType = 'hard4') {
    const sud = createSudoku(dataType);
    return sud.step()
        .then(() => sud.dumpGrid())
        .then(() => sudRepl.start(sud), errorHandler);
}

export function solve(dataType = 'hard4') {
    const sud = createSudoku(dataType);
    return sud.solve()
        .then(() => sud.dumpGrid(), errorHandler);
}
