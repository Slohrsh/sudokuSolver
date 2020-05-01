import { Rule } from '../rule';
import { GridProvider } from 'src/app/game/grid-provider';
import { Cell } from 'src/app/common/cell';

export class EliminatePencilmarksByCurrentBoxConstraints implements Rule {
  execute(cell: Cell, grid: GridProvider): void {
    const cellsOfCurrentBox = grid.getCellsOfCurrentBox(cell.position, true);
    for (const cellOfCurrentBox of cellsOfCurrentBox) {
      if (!cellOfCurrentBox.equals(cell)) {
        if (cell.containsPencilmark(cellOfCurrentBox.selection)) {
          cell.removePencilmark(cellOfCurrentBox.selection);
        }
        if (cell.pencilmarks.length === 1) {
          cell.selection = cell.pencilmarks[0];
          cell.pencilmarks = [];
        }
      }
    }
  }
}
