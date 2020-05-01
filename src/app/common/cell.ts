import { debug } from 'util';

export class Grid {
  cell: Cell[][];

  constructor(cell: Cell[][]) {
    this.cell = cell;
  }

  get(x: number, y: number) {
    return this.cell[y][x];
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

  equals(cell: Cell)
  {
    return (this.position.x === cell.position.x && this.position.y === cell.position.y);
  }

  containsPencilmark(selection: number) {
    return this.pencilmarks.includes(selection);
  }

  removePencilmark(selection: number) {
    if (this.pencilmarks != null && this.containsPencilmark(selection)) {
      this.pencilmarks.splice(this.pencilmarks.indexOf(selection), 1);
    }
  }
}

export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
