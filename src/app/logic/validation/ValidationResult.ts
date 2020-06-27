import { Cell } from 'src/app/common/cell';

export class ValidationResult {

  invalidCells: Cell[] = [];

  hasInvalidCells(): boolean {
    return (Array.isArray(this.invalidCells) && this.invalidCells.length > 0);
  }

  addAll(cells: Cell[]) {
    for (const cell of cells) {
      if (this.invalidCells != null && !this.containsInvalidCells(cell)) {
        this.invalidCells.push(cell);
      }
    }
  }
  containsInvalidCells(cell: Cell) {
    return this.invalidCells.includes(cell);
  }
}
