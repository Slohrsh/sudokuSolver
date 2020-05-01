import { Cell } from 'src/app/common/cell';

export abstract class CellResolver {

  resolveCell(cell: Cell) {
    if (cell.pencilmarks.length === 1) {
      cell.selection = cell.pencilmarks[0];
      cell.pencilmarks = [];
    }
  }
}
