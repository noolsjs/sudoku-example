# Sudoku

This is an example of using [nools](https://github.com/noolsjs/nools) to solve a [Sudoku Puzzle](https://en.wikipedia.org/wiki/Sudoku).

## Installation

First install the dependencies

```sh
npm install
```

### Solve

To solve a sudoku puzzle run the `solve` task. This task by default will solve the `hard4` puzzle.

```sh
npm run solve
```

### Repl

If you wish to step through the solution then the `repl` can be used.


```sh
npm run repl
```

The repl contains multiple commands that you can use while stepping through the puzzle.

* `.step` This command will just run one iteration of the rules engine allowing you to step through the solution one iteration at a time.
* `.solve` This will run through each step automatically until a solution is found.
* `.print` This will print the current state of the puzzle.

## Sudoku Rules

The `sudoku.nools` contains the logic for solving the puzzle. It contains multiple rules for eliminating values from each cell to come to a final value.

**Definitions**

* `cell` - A Single cell.
* `cell group` - A group of cells that are in the same `row`, `column` or `sqr`.

**Rules**

1. `single` - This rule will detect any cell with only one free value and assert a `Setting` for that cell.
2. `hidden single` - This rule will detect any cell that has a free value that no other cell in the same `cell group` also contains the free value.
3. `naked pair` - A "naked pair" is two cells in some `cell group` with their sets of permissible values being equal with cardinality 2. These two values can be removed from all other cells lists in the `cell group`.
4. `hidden pair in row` - If two cells within the same `cell group` contain candidate sets with more than two values, with two values being in both of them but in none of the other cells in the same row, then we have a "hidden pair". We can remove all other candidates from these two cells.
5. `hidden pair in col` - If two cells within the same `cell group` contain candidate sets with more than two values, with two values being in both of them but in none of the other cells in the same col, then we have a "hidden pair". We can remove all other candidates from these two cells.
6. `hidden pair in square` - If two cells within the same `cell group` contain candidate sets with more than two values, with two values being in both of them but in none of the other cells in the same square, then we have a "hidden pair". We can remove all other candidates from these two cells.
7. `X-wings in rows` - See [X Wing Strategy](http://www.sudokuwiki.org/x_wing_strategy). When both of the following conditions are true then all other candidates for that value can be eliminated from the first set of cells.
    * 2 candidates for a value, in each of 2 different rows of the same kind.
    * These candidates lie also on 2 other rows of the same kind.
8. `X-wings in cols` - See [X Wing Strategy](http://www.sudokuwiki.org/x_wing_strategy).When both of the following conditions are true then all other candidates for that value can be eliminated from the first set of cells.
    * 2 candidates for a value, in each of 2 different cols of the same kind.
    * These candidates lie also on 2 other cols of the same kind.
9. `intersection removal column` - When a value occurs in a Cell but not in another cell of the same square and a different column, but there is a cell in the same column and another square containing this value then remove the value from the later cell.
10. `intersection removal row` - When a value occurs in a Cell but not in another cell of the same square and a different row, but there is a cell in the same row and another square containing this value then remove the value from the later cell.



## Puzzles

* `invalid` - This is an example of an invalid sudoku puzzle with duplicate values. `validation.nools` will print out the duplicate cells and exit.

<table>
  <tr><td>9</td><td>5</td><td>6</td><td>8</td><td></td><td>1</td><td>9</td><td>4</td><td></td>
	<tr><td>9</td><td></td><td></td><td>6</td><td></td><td>5</td><td></td><td></td><td>3</td>
	<tr><td>7</td><td></td><td></td><td>4</td><td>9</td><td>3</td><td></td><td></td><td>8</td>
	<tr><td>8</td><td>9</td><td>7</td><td></td><td>4</td><td></td><td>6</td><td>3</td><td>5</td>
	<tr><td></td><td></td><td>3</td><td>9</td><td></td><td>6</td><td>8</td><td></td><td></td>
	<tr><td>4</td><td>6</td><td>5</td><td></td><td>8</td><td></td><td>2</td><td>9</td><td>1</td>
	<tr><td>5</td><td></td><td></td><td>2</td><td>6</td><td>9</td><td></td><td></td><td>7</td>
	<tr><td>6</td><td></td><td></td><td>5</td><td></td><td>4</td><td></td><td></td><td>9</td>
	<tr><td></td><td>4</td><td>9</td><td>7</td><td></td><td>8</td><td>3</td><td>5</td><td></td>
</table>

* `simple` - This is an example of a simple sudoku puzzle that is solved in `33` steps.

<table>
  <tr><td></td><td>5</td><td>6</td><td>8</td><td></td><td>1</td><td>9</td><td>4</td><td></td>
	<tr><td>9</td><td></td><td></td><td>6</td><td></td><td>5</td><td></td><td></td><td>3</td>
	<tr><td>7</td><td></td><td></td><td>4</td><td>9</td><td>3</td><td></td><td></td><td>8</td>
	<tr><td>8</td><td>9</td><td>7</td><td></td><td>4</td><td></td><td>6</td><td>3</td><td>5</td>
	<tr><td></td><td></td><td>3</td><td>9</td><td></td><td>6</td><td>8</td><td></td><td></td>
	<tr><td>4</td><td>6</td><td>5</td><td></td><td>8</td><td></td><td>2</td><td>9</td><td>1</td>
	<tr><td>5</td><td></td><td></td><td>2</td><td>6</td><td>9</td><td></td><td></td><td>7</td>
	<tr><td>6</td><td></td><td></td><td>5</td><td></td><td>4</td><td></td><td></td><td>9</td>
	<tr><td></td><td>4</td><td>9</td><td>7</td><td></td><td>8</td><td>3</td><td>5</td><td></td>
</table>

* `medium` - This is an example of a medium difficulty puzzle that is solved in `48` steps.

<table>
  <tr><td>8</td><td>4</td><td>7</td><td></td><td></td><td></td><td>2</td><td>5</td><td>6</td>
	<tr><td>5</td><td></td><td></td><td></td><td>8</td><td></td><td></td><td></td><td>4</td>
	<tr><td>2</td><td></td><td></td><td></td><td>7</td><td></td><td></td><td></td><td>8</td>
	<tr><td></td><td></td><td></td><td>3</td><td></td><td>8</td><td></td><td></td><td></td>
	<tr><td></td><td>5</td><td>1</td><td></td><td></td><td></td><td>8</td><td>7</td><td>2</td>
	<tr><td></td><td></td><td></td><td>5</td><td></td><td>7</td><td></td><td></td><td></td>
	<tr><td>4</td><td></td><td></td><td></td><td>5</td><td></td><td></td><td></td><td>7</td>
	<tr><td>6</td><td></td><td></td><td></td><td>3</td><td></td><td></td><td></td><td>9</td>
	<tr><td>1</td><td>3</td><td>2</td><td></td><td></td><td></td><td>4</td><td>8</td><td>5</td>
</table>

* `hard1`, `hard2`, `hard3`, `hard4` - All of these hard hard difficulty puzzles and take `55` steps to solve.

**`hard1`**

<table>
  <tr><td></td><td></td><td></td><td></td><td>5</td><td>1</td><td></td><td>8</td><td></td>
	<tr><td></td><td>8</td><td></td><td></td><td>4</td><td></td><td></td><td></td><td>5</td>
	<tr><td></td><td></td><td>3</td><td></td><td></td><td></td><td>2</td><td></td><td></td>
	<tr><td></td><td></td><td></td><td></td><td>6</td><td></td><td></td><td></td><td>9</td>
	<tr><td>6</td><td>7</td><td></td><td>4</td><td></td><td>9</td><td></td><td>1</td><td>3</td>
	<tr><td>8</td><td></td><td></td><td></td><td>3</td><td></td><td></td><td></td><td></td>
	<tr><td></td><td></td><td>2</td><td></td><td></td><td></td><td>4</td><td></td><td></td>
	<tr><td>5</td><td></td><td></td><td></td><td>9</td><td></td><td></td><td>2</td><td></td>
	<tr><td></td><td>9</td><td></td><td>7</td><td>1</td><td></td><td></td><td></td><td></td>
</table>

**`hard2`**

<table>
  <tr><td></td><td></td><td></td><td>6</td><td></td><td></td><td>1</td><td></td><td></td>
	<tr><td></td><td></td><td></td><td></td><td></td><td>5</td><td></td><td></td><td>6</td>
	<tr><td>5</td><td></td><td>7</td><td></td><td></td><td></td><td>2</td><td>3</td><td></td>
	<tr><td></td><td>8</td><td></td><td>9</td><td></td><td>7</td><td></td><td></td><td></td>
	<tr><td>9</td><td>3</td><td></td><td></td><td></td><td></td><td></td><td>6</td><td>7</td>
	<tr><td></td><td></td><td></td><td>4</td><td></td><td>6</td><td></td><td>1</td><td></td>
	<tr><td></td><td>7</td><td>4</td><td></td><td></td><td></td><td>9</td><td></td><td>1</td>
	<tr><td>8</td><td></td><td></td><td>7</td><td></td><td></td><td></td><td></td><td></td>
	<tr><td></td><td></td><td>3</td><td></td><td></td><td>8</td><td></td><td></td><td></td>
</table>

**`hard3`**

<table>
  <tr><td></td><td>8</td><td></td><td></td><td></td><td>6</td><td></td><td></td><td>5</td>
	<tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td>4</td><td>8</td><td></td>
	<tr><td></td><td></td><td>9</td><td></td><td></td><td>8</td><td></td><td>1</td><td></td>
	<tr><td></td><td></td><td></td><td></td><td>8</td><td></td><td>1</td><td></td><td>2</td>
	<tr><td></td><td></td><td></td><td>3</td><td></td><td>1</td><td></td><td></td><td></td>
	<tr><td>6</td><td></td><td>1</td><td></td><td>9</td><td></td><td></td><td></td><td></td>
	<tr><td></td><td>9</td><td></td><td>4</td><td></td><td></td><td>8</td><td></td><td></td>
	<tr><td></td><td>7</td><td>6</td><td></td><td></td><td></td><td></td><td></td><td>3</td>
	<tr><td>1</td><td></td><td></td><td>7</td><td></td><td></td><td></td><td>5</td><td></td>
</table>

**`hard4`**

<table>
  <tr><td></td><td></td><td></td><td></td><td></td><td>4</td><td></td><td>9</td><td>5</td>
	<tr><td>6</td><td>7</td><td></td><td>5</td><td></td><td></td><td></td><td>1</td><td></td>
	<tr><td></td><td></td><td></td><td>6</td><td></td><td>9</td><td></td><td></td><td></td>
	<tr><td></td><td>2</td><td></td><td></td><td></td><td></td><td>4</td><td></td><td></td>
	<tr><td>8</td><td>1</td><td></td><td></td><td></td><td></td><td></td><td>7</td><td>2</td>
	<tr><td></td><td></td><td>7</td><td></td><td></td><td></td><td></td><td>8</td><td></td>
	<tr><td></td><td></td><td></td><td>3</td><td></td><td>5</td><td></td><td></td><td></td>
	<tr><td></td><td>6</td><td></td><td></td><td></td><td>1</td><td></td><td>5</td><td>8</td>
	<tr><td>7</td><td>3</td><td></td><td>9</td><td></td><td></td><td></td><td></td><td></td>
</table>





