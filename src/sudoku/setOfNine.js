/**
 * Base class for an type that should track values;
 */
export default class SetOfNine {

    static get ALL_NINE() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    constructor() {
        this.free = SetOfNine.ALL_NINE;
    }

    /**
     * Returns the number of free values.
     * @return {Number}
     */
    get count() {
        return this.free.length;
    }

    /**
     * Block a value from being eligible.
     *
     * @param {Number} value the value to block
     * @return {SetOfNine}
     */
    blockValue(value) {
        const index = this.free.indexOf(value);
        if (index !== -1) {
            this.free.splice(index, 1);
        }
        return this;
    }

    /**
     * Blocks all values except for the values provided
     *
     * @param {Array.<Number>} values to still allow.
     * @return {SetOfNine}
     */
    blockExcept(values) {
        this.free = values || [];
        return this;
    }

    /**
     * Returns the first free value from this set of nine.
     * @return {Number}
     */
    get freeValue() {
        return this.free[0];
    }
}
