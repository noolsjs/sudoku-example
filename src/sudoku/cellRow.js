import CellFile from './cellFile';

/**
 * A row of cells.
 */
export default class CellRow extends CellFile {
    constructor(number) {
        super(number, 'Row');
    }
}
