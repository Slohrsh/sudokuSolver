import { Grid, Cell, Position } from '../common/cell';

export enum GameState {
  IDLE, SOLVE, PLAY
}

export class GridProvider {

  SIZE_X = 9;
  SIZE_Y = 9;

  grid: Grid;

  constructor(grid: Cell[][]) {
    this.grid = new Grid(grid);
  }

  isSolved(): boolean {
    for (let y = 0; y < this.SIZE_Y; y++) {
      for (let x = 0; x < this.SIZE_X; x++) {
        if (!this.grid.get(x, y).isSelected()) {
          return false;
        }
      }
    }
    return true;
  }


  addCells(cells: Cell[], cell: Cell, onlySelected: boolean) {
    if (cell == null) {
      const a = 0;
    }
    if (!onlySelected || cell.isSelected()) {
      cells.push(cell);
    }
  }

  getCellsOfCurrentBox(position: Position, onlySelected: boolean): Cell[] {
    return this.grid.cells[position.box].filter(cell => !onlySelected || cell.isSelected());
  }


  getCellsOfCurrentRow(position: Position, onlySelected: boolean) {
    const cells: Cell[] = [];

    const boxRow = this.getCurrentRowSummand(position.box);
    const cellRow = this.getCurrentRowSummand(position.cell);

    for (let box = 0; box < 3; box++) {
      for (let cell = 0; cell < 3; cell++) {
        this.addCells(cells, this.grid.get(cell + cellRow, box + boxRow), onlySelected);
      }
    }

    return cells;
  }

  getCellsOfCurrentColumn(position: Position, onlySelected: boolean): Cell[] {
    const cells: Cell[] = [];

    const boxCol = this.getCurrentColumnSummand(position.box);
    const cellCol = this.getCurrentColumnSummand(position.cell);

    const iter = [0, 3, 6];

    for (const box of iter) {
      for (const cell of iter) {
        this.addCells(cells, this.grid.get(cell + cellCol, box + boxCol), onlySelected);
      }
    }

    return cells;
  }

  getCurrentRowSummand(box: number): number {
    if (box === 0 || box === 1 || box === 2) {
      return 0;
    } else if (box === 3 || box === 4 || box === 5) {
      return 3;
    } else if (box === 6 || box === 7 || box === 8) {
      return 6;
    }
  }

  getCurrentColumnSummand(box: number): number {
    if (box === 0 || box === 3 || box === 6) {
      return 0;
    } else if (box === 1 || box === 4 || box === 7) {
      return 1;
    } else if (box === 2 || box === 5 || box === 8) {
      return 2;
    }
  }

  getCellsOfCurrentRowAndCol(position: Position, onlySelected: boolean): Cell[] {
    const cells: Cell[] = [];

    cells.concat(this.getCellsOfCurrentRow(position, onlySelected));
    cells.concat(this.getCellsOfCurrentColumn(position, onlySelected));

    return cells;
  }

}
