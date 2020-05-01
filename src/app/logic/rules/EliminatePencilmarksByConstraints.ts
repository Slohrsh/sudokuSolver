import { Rule } from '../rule';
import { GridProvider } from 'src/app/game/grid-provider';
import { Cell } from 'src/app/common/cell';
import { CellResolver } from './CellResolver';

export abstract class EliminatePencilmarksByConstraints extends CellResolver implements Rule {

  execute(cell: Cell, grid: GridProvider): void {
    if (cell.isSelected()) {
      return;
    }
    const relevantCells = this.getRelevantCells(grid, cell);
    for (const relevantCell of relevantCells) {
      if (!relevantCell.equals(cell)) {
        cell.removePencilmark(relevantCell.selection);
      }
      this.resolveCell(cell);
    }
  }

  abstract getRelevantCells(grid: GridProvider, cell: Cell): Cell[];
}
