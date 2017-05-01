/**
 * Used when stepping to solve for one free value.
 */
export default class Counter {
    constructor(count) {
        this.count = count;
    }

    decrement() {
        this.count -= 1;
        return this;
    }

    increment() {
        this.count += 1;
        return this;
    }
}
