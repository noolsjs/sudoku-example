import repl from 'repl';

function errorHandler(err) {
    console.error(err.stack);
    process.exit(1);
}

function start(sudoku) {
    const sudkuRepl = repl.start('sudoku>>');
    sudkuRepl.defineCommand('print', {
        help: 'Print the current state of the sudoku puzzle.',
        action: () => sudoku.dumpGrid(),
    });
    sudkuRepl.defineCommand('step', {
        help: 'Perform the next iteration in solving the sudoku puzzle.',
        action: () => sudoku.step()
            .then(() => sudoku.dumpGrid())
            .then(() => sudkuRepl.displayPrompt(true), errorHandler),
    });
    sudkuRepl.defineCommand('solve', {
        help: 'Solve the sudoku puzzle.',
        action: () => sudoku.solve()
            .then(() => sudoku.dumpGrid())
            .then(() => process.exit(), errorHandler),
    });
}

export default {start};
