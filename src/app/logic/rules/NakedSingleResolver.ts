import { RuleObserver, Rule } from '../rule';
import { Cell } from 'src/app/common/cell';
import { GridProvider } from 'src/app/game/grid-provider';
import { Observable, Subject } from 'rxjs';
import { LogicExplanation } from 'src/app/common/LogicExplanation';

export class NakedSingleResolver implements Rule {

  private rule = 'Naked Single';
  private description = 'Resolves Cells which only has one possible Field';

  execute(cell: Cell, grid: GridProvider, selectedCells: Subject<LogicExplanation>): void {
    selectedCells.next(new LogicExplanation([cell], this.rule, this.description));
    if (cell.pencilmarks.length === 1) {
      cell.selection = cell.pencilmarks[0];
      cell.pencilmarks = [];
    }
  }
}
