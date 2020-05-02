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

  getCellsOfCurrentBox(position: Position, onlySelected: boolean): Cell[] {
    const boxCenterPosition = this.getCenterPositionOfBox(position);
    const cells: Cell[] = [];

    this.addCells(cells, this.grid.get(boxCenterPosition.x - 1, boxCenterPosition.y - 1), onlySelected);
    this.addCells(cells, this.grid.get(boxCenterPosition.x, boxCenterPosition.y - 1), onlySelected);
    this.addCells(cells, this.grid.get(boxCenterPosition.x + 1, boxCenterPosition.y - 1), onlySelected);

    this.addCells(cells, this.grid.get(boxCenterPosition.x - 1, boxCenterPosition.y), onlySelected);
    this.addCells(cells, this.grid.get(boxCenterPosition.x, boxCenterPosition.y), onlySelected);
    this.addCells(cells, this.grid.get(boxCenterPosition.x + 1, boxCenterPosition.y), onlySelected);

    this.addCells(cells, this.grid.get(boxCenterPosition.x - 1, boxCenterPosition.y + 1), onlySelected);
    this.addCells(cells, this.grid.get(boxCenterPosition.x, boxCenterPosition.y + 1), onlySelected);
    this.addCells(cells, this.grid.get(boxCenterPosition.x + 1, boxCenterPosition.y + 1), onlySelected);

    return cells;
  }

  addCells(cells: Cell[], cell: Cell, onlySelected: boolean) {
    if (!onlySelected || cell.isSelected()) {
      cells.push(cell);
    }
  }


  getCellsOfCurrentRowAndCol(position: Position, onlySelected: boolean): Cell[] {
    const cells: Cell[] = [];

    cells.concat(this.getCellsOfCurrentRow(position, onlySelected));
    cells.concat(this.getCellsOfCurrentColumn(position, onlySelected));

    return cells;
  }

  getCellsOfCurrentRow(position: Position, onlySelected: boolean) {
    const cells: Cell[] = [];

    for (let x = position.x; x >= 0; x--) {
      this.addCells(cells, this.grid.get(x, position.y), onlySelected);
    }
    for (let x = position.x; x < this.SIZE_X; x++) {
      this.addCells(cells, this.grid.get(x, position.y), onlySelected);
    }

    return cells;
  }

  getCellsOfCurrentColumn(position: Position, onlySelected: boolean): Cell[] {
    const cells: Cell[] = [];

    for (let y = position.y; y >= 0; y--)  {
      this.addCells(cells, this.grid.get(position.x, y), onlySelected);
    }
    for (let y = position.y; y < this.SIZE_Y; y++) {
      this.addCells(cells, this.grid.get(position.x, y), onlySelected);
    }

    return cells;
  }

  getCenterPositionOfBox(position: Position): Position {
    const boxPosition: Position = new Position(this.getRowPos(position.x), this.getRowPos(position.y));

    if (boxPosition.x === 0 && boxPosition.y === 0) {
      return new Position(1, 1);
    }
    if (boxPosition.x === 1 && boxPosition.y === 0) {
      return new Position(4, 1);
    }
    if (boxPosition.x === 2 && boxPosition.y === 0) {
      return new Position(7, 1);
    }

    if (boxPosition.x === 0 && boxPosition.y === 1) {
      return new Position(1, 4);
    }
    if (boxPosition.x === 1 && boxPosition.y === 1) {
      return new Position(4, 4);
    }
    if (boxPosition.x === 2 && boxPosition.y === 1) {
      return new Position(7, 4);
    }

    if (boxPosition.x === 0 && boxPosition.y === 2) {
      return new Position(1, 7);
    }
    if (boxPosition.x === 1 && boxPosition.y === 2) {
      return new Position(4, 7);
    }
    if (boxPosition.x === 2 && boxPosition.y === 2) {
      return new Position(7, 7);
    }
  }

  getRowPos(pos: number) {
    if (pos < 3) {
      return 0;
    } else if (pos >= 3 && pos < 6) {
      return 1;
    } else if (pos >= 6) {
      return 2;
    }
  }
}
