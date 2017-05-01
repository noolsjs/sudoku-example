import SetOfNine from './setOfNine';

/**
 * Base class for groups of related cells.
 */
export default class CellGroup extends SetOfNine {
    constructor() {
        super();
        this.cells = [];
    }

    addCell(cell) {
        this.cells.push(cell);
    }

    toString() {
        return this.cells.join(', ');
    }
}
