import _ from 'lodash';
import Cell from './cell';
import CellCol from './cellCol';
import CellRow from './cellRow';
import CellSqr from './cellSqr';
import Counter from './counter';
import SetOfNine from './setOfNine';
import Setting from './setting';
import Stepping from './stepping';
import ValidPuzzle from './validPuzzle';

export default class Sudoku {
    constructor({sudokuFlow, validateFlow, logger = console}) {
        this.rows = [];
        this.cols = [];
        this.sqrs = [];
        this.cells = [];
        this.solvedCount = 0;
        this.stepCount = 0;
        this.sudokuFlow = sudokuFlow;
        this.sudokuSession = sudokuFlow.getSession();
        this.validateFlow = validateFlow;
        this.logger = logger;
        this.stepping = null;
        this.isInitialized = false;
        this.sudokuSession.on('set-cell', () => {
            this.solvedCount += 1;
        });
    }

    init() {
        if (this.isInitialized) {
            return Promise.resolve();
        }
        this.logger.info('\nInitializing Puzzle:');
        this.isInitialized = true;
        return this.sudokuSession.matchUntilHalt();
    }

    step() {
        return this.init()
            .then(() => this.validate())
            .then(() => {
                this.stepCount += 1;
                this.logger.info(`\nInitiating Next Step: ${this.stepCount}`);
                this.sudokuSession.halt();
                this.counter.count = 1;
                this.sudokuSession.modify(this.counter);
                if (!this.stepping) {
                    this.stepping = new Stepping();
                    this.sudokuSession.assert(this.stepping);
                }
                return this.sudokuSession.matchUntilHalt();
            });
    }

    solve() {
        if (this.solvedCount === 81) {
            return Promise.resolve();
        }
        return this.step()
            .then(() => this.dumpGrid())
            .then(() => this.solve());
    }

    validate() {
        this.logger.info('Validating puzzle');
        const session = this.validateFlow.getSession();
        this.rows.forEach((row, iRow) => {
            session.assert(row);
            session.assert(this.cols[iRow]);
            session.assert(this.sqrs[Math.floor(iRow / 3)][iRow % 3]);
            this.cells[iRow].forEach(c => session.assert(c));
        });
        const validPuzzle = new ValidPuzzle();
        session.assert(validPuzzle);
        return session.matchUntilHalt().then(() => {
            if (!validPuzzle.isValid) {
                validPuzzle.errors.forEach(e => this.logger.error(e));
                this.dumpGrid();
                process.exit(1);
            }
        });
    }

    createColsAndRows() {
        SetOfNine.ALL_NINE.forEach((val, i) => {
            this.sudokuSession.assert(val);
            this.rows[i] = new CellRow(i);
            this.cols[i] = new CellCol(i);
        });
    }

    createCells() {
        SetOfNine.ALL_NINE.forEach((val, iRow) => {
            this.cells[iRow] = SetOfNine.ALL_NINE.map((v, iCol) => {
                const cell = new Cell();
                this.rows[iRow].addCell(cell);
                this.cols[iCol].addCell(cell);
                return cell;
            });
        });
    }

    createCellSqrs() {
        for (let i = 0; i < 3; i += 1) {
            const i3 = i * 3;
            this.sqrs[i] = [];
            for (let j = 0; j < 3; j += 1) {
                const j3 = j * 3;
                this.sqrs[i][j] = new CellSqr(
                    this.rows[i3],
                    this.rows[i3 + 1],
                    this.rows[i3 + 2],
                    this.cols[j3],
                    this.cols[j3 + 1],
                    this.cols[j3 + 2]);
            }
        }
    }

    createReferences() {
        for (let iRow = 0; iRow < 9; iRow += 1) {
            const row = this.rows[iRow];
            for (let iCol = 0; iCol < 9; iCol += 1) {
                const col = this.cols[iCol];
                const sqr = this.sqrs[Math.floor(iRow / 3)][Math.floor(iCol / 3)];
                this.cells[iRow][iCol].makeReferences(row, col, sqr);
            }
            this.sudokuSession.assert(row);
            this.sudokuSession.assert(this.cols[iRow]);
            this.sudokuSession.assert(this.sqrs[Math.floor(iRow / 3)][iRow % 3]);
        }
    }

    assertGrid() {
        for (let iRow = 0; iRow < 9; iRow += 1) {
            const row = this.rows[iRow];
            for (let iCol = 0; iCol < 9; iCol += 1) {
                this.sudokuSession.assert(this.cells[iRow][iCol]);
            }
            this.sudokuSession.assert(row);
            this.sudokuSession.assert(this.cols[iRow]);
            this.sudokuSession.assert(this.sqrs[Math.floor(iRow / 3)][iRow % 3]);
        }
    }

    create() {
        this.createColsAndRows();
        this.createCells();
        this.createCellSqrs();
        this.createReferences();
        this.assertGrid();
        return this;
    }

    assertSettings(cellValues) {
        let initial = 0;
        for (let iRow = 0; iRow < 9; iRow += 1) {
            for (let iCol = 0; iCol < 9; iCol += 1) {
                const value = cellValues[iRow][iCol];
                if (value) {
                    this.sudokuSession.assert(new Setting(iRow, iCol, value));
                    initial += 1;
                }
            }
        }
        this.counter = new Counter(initial);
        this.sudokuSession.assert(this.counter);
    }

    /**
     *
     * @param flow
     * @param cellValues
     * @return {Sudoku}
     */
    static createFromCellValues({sudokuFlow, validateFlow, cellValues}) {
        const sudoku = new Sudoku({sudokuFlow, validateFlow});
        const s000 = new Setting(0, 0, 0);
        sudoku.sudokuSession.assert(s000);
        sudoku.create();
        sudoku.assertSettings(cellValues);
        sudoku.sudokuSession.retract(s000);
        return sudoku;
    }

    static get headersString() {
        const cols = SetOfNine.ALL_NINE.map((val, index) => _.pad(`Col: ${index}`, 11, ' '));
        return `    ${cols.join('')}`;
    }

    get cellsString() {
        return this.cells.map((cellRow, rowNum) => {
            const rowCols = cellRow.map(cell => cell.valueString);
            return `Row: ${rowNum}${rowCols.join('')}`;
        }).join('\n');
    }

    dumpGrid(logger = console) {
        logger.log(`Current State [solvedCount=${this.solvedCount}] [stepsTaken=${this.stepCount}]:\n${Sudoku.headersString}\n${this.cellsString}`);
    }
}
