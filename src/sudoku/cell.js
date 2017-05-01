import {uniq, pad} from 'lodash';
import SetOfNine from './setOfNine';

/**
 * A single value cell in the current puzzle.
 */
export default class Cell extends SetOfNine {

    constructor() {
        super();
        this.exCells = [];
        this.value = null;
        this.cellRow = null;
        this.cellCol = null;
        this.cellSqr = null;
        this.exCells = [];
    }

    setValue(value) {
        this.blockExcept();
        this.value = value;
        return this;
    }

    makeReferences(cr, col, sqr) {
        this.cellRow = cr;
        this.cellCol = col;
        this.cellSqr = sqr;
        this.colNo = col.number;
        this.rowNo = cr.number;
        this.exCells = uniq(this.exCells.concat(cr.cells).concat(col.cells).concat(sqr.cells));
        this.exCells.splice(this.exCells.indexOf(this), 1);
        return this;
    }

    toString() {
        return `${this.posAsString()}: ${this.value}`;
    }

    /**
     * The current position as a string.
     *
     * @return {string} the cell position as a string [rowNum, colNum].
     */
    posAsString() {
        return `[${this.cellRow.number}, ${this.cellCol.number}]`;
    }

    /**
     * Creates a string of the current value OR available values.
     *
     * ```
     * '--- 1 ---'
     * '1 3 5 7 9'
     * '123456789'
     * ```
     *
     * @return {*} the current value(s) as a string.
     */
    get valueString() {
        if (this.value !== null) {
            return pad(`--- ${this.value} ---`, 11, ' ');
        }
        const free = this.free;
        const valuesStr = SetOfNine.ALL_NINE.map((i) => {
            if (free.indexOf(i) === -1) {
                return ' ';
            }
            return i;
        }).join('');
        return pad(valuesStr, 11, ' ');
    }
}
