import { debug } from 'util';

export class Grid {
  cells: Cell[][];

  constructor(cell: Cell[][]) {
    this.cells = cell;
  }

  get(cell: number, box: number) {
    return this.cells[box][cell];
  }
}

export class Cell {
  pencilmarks: number[];
  selection: number;
  position: Position;
  isGivenValue: boolean;

  constructor(selection: number, position: Position) {
    this.position = position;
    this.selection = selection;
    if (selection !== 0) {
      this.isGivenValue = true;
    } else {
      this.pencilmarks = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  }

  isSelected(): boolean {
    return this.selection !== 0;
  }

  equals(cell: Cell) {
    return (this.position.cell === cell.position.cell && this.position.box === cell.position.box);
  }

  containsPencilmark(selection: number) {
    return this.pencilmarks.includes(selection);
  }

  removePencilmark(selection: number): boolean {
    if (this.pencilmarks != null && this.containsPencilmark(selection)) {
      this.pencilmarks.splice(this.pencilmarks.indexOf(selection), 1);
      return true;
    }
    return false;
  }
}

export class Position {
  cell: number;
  box: number;

  constructor(cell: number, box: number) {
    this.cell = cell;
    this.box = box;
  }
}
