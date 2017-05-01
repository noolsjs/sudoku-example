/**
 * A Fact used to set a value of a cell.
 */
export default class Setting {
    /**
     *
     * @param {Number} rowNo the row of the cell to set.
     * @param {Number} colNo the column of the cell to set.
     * @param {Number} value the value to set the cell to.
     */
    constructor(rowNo, colNo, value) {
        this.rowNo = rowNo;
        this.colNo = colNo;
        this.value = value;
    }

    toString() {
        return `Setting [${this.rowNo},${this.colNo}] : ${this.value}`;
    }
}
