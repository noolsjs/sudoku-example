import CellFile from './cellFile';

/**
 * A column of cells.
 */
export default class CellCol extends CellFile {
    constructor(number) {
        super(number, 'Column');
    }
}
