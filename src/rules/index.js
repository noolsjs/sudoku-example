import nools from 'nools';
import * as sudoku from '../sudoku';

export function createSudokuFlow({explain = true, logger = console}) {
    const flowOptions = {
        define: {
            Cell: sudoku.Cell,
            CellCol: sudoku.CellCol,
            CellGroup: sudoku.CellGroup,
            CellRow: sudoku.CellCol,
            CellSqr: sudoku.CellSqr,
            Counter: sudoku.Counter,
            Setting: sudoku.Setting,
            Stepping: sudoku.Stepping,
        },
        scope: {
            explain,
            logger,
        },
    };
    return nools.compile(require.resolve('./sudoku.nools'), flowOptions);
}

export function createValidateFlow({logger = console}) {
    const flowOptions = {
        define: {
            Cell: sudoku.Cell,
            CellCol: sudoku.CellCol,
            CellRow: sudoku.CellCol,
            CellSqr: sudoku.CellSqr,
            ValidPuzzle: sudoku.ValidPuzzle,
        },
        scope: {
            explain: true,
            logger,
        },
    };
    return nools.compile(require.resolve('./validate.nools'), flowOptions);
}
