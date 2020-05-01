import { RuleObserver, Rule } from '../rule';
import { Cell } from 'src/app/common/cell';
import { GridProvider } from 'src/app/game/grid-provider';

export class NakedSingleResolver implements Rule {

  execute(cell: Cell, grid: GridProvider): void {
    if (cell.pencilmarks.length === 1) {
      cell.selection = cell.pencilmarks[0];
      cell.pencilmarks = [];
    }
  }
}
