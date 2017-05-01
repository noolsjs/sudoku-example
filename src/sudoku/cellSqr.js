import CellGroup from './cellGroup';

/**
 * A 3x3 square in the Sudoku grid.
 */
export default class CellSqr extends CellGroup {
    /**
     * @param cellRow0 the 1st row passing through this block.
     * @param cellRow1 the 2nd row passing through this block.
     * @param cellRow2 the 3rd row passing through this block.
     * @param cellCol0 the 1st column passing through this block.
     * @param cellCol1 the 2nd column passing through this block.
     * @param cellCol2 the 3rd column passing through this block.
     */
    constructor(cellRow0, cellRow1, cellRow2, cellCol0, cellCol1, cellCol2) {
        super();
        for (let i = cellRow0.number; i <= cellRow2.number; i += 1) {
            this.addCell(cellCol0.cells[i]);
            this.addCell(cellCol1.cells[i]);
            this.addCell(cellCol2.cells[i]);
        }
    }
}
