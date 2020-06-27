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


  getCellsOfCurrentColumn(cellPosition: Position, onlySelected: boolean) {
    const cells: Cell[] = [];

    for (let i = 0; i < 9; i++) {
      const position = new Position(
        (((i % 3) * 3) % 7) + cellPosition.cell % 3,
        (Math.floor(i / 3) * 3) % 7 + cellPosition.box % 3);
      this.addCells(cells, this.grid.get(position.cell, position.box), onlySelected);
    }

    return cells;
  }

  getCellsOfCurrentRow(cellPosition: Position, onlySelected: boolean): Cell[] {
    const cells: Cell[] = [];

    for (let i = 0; i < 9; i++) {
      const position = new Position(
        (i % 3) + (Math.floor(cellPosition.cell / 3) * 3),
        Math.floor(i / 3) + (Math.floor(cellPosition.box / 3) * 3));
      this.addCells(cells, this.grid.get(position.cell, position.box), onlySelected);
    }

    return cells;
  }

  getCellsOfCurrentRowAndCol(position: Position, onlySelected: boolean): Cell[] {
    const cells: Cell[] = [];

    cells.concat(this.getCellsOfCurrentRow(position, onlySelected));
    cells.concat(this.getCellsOfCurrentColumn(position, onlySelected));

    return cells;
  }

  getAllCellsByPencilmark(cellsToCheck: Cell[], pencilmark: number): Cell[] {
    const foundCells: Cell[] = [];
    for (const cell of cellsToCheck) {
      if (cell.pencilmarks && cell.pencilmarks.includes(pencilmark)) {
        foundCells.push(cell);
      }
    }
    return foundCells;
  }

  getOtherCellsByPencilmarkOrSelection(currentCell: Cell, cellsToCheck: Cell[], pencilmark: number): Cell[] {
    const foundCells: Cell[] = [];
    for (const cell of cellsToCheck) {
      if (!currentCell.equals(cell) && (cell.pencilmarks && cell.pencilmarks.includes(pencilmark)) || cell.selection === pencilmark) {
        foundCells.push(cell);
      }
    }
    return foundCells;
  }

}
