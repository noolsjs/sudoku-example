export default class ValidPuzzle {
    constructor() {
        this.isValid = true;
        this.errors = [];
    }

    addError(err) {
        this.isValid = false;
        this.errors.push(err);
        return this;
    }
}
