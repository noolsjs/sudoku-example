import CellGroup from './cellGroup';

/**
 * Base class for numbered cell groups: rows and columns.
 */
export default class CellFile extends CellGroup {
    constructor(number, type = 'CellFile') {
        super();
        this.number = number;
        this.type = type;
    }

    toString() {
        return `${this.type} ${this.number}: ${super.toString()}`;
    }
}
