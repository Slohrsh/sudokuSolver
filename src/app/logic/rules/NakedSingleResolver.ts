import { RuleObserver, CellRule } from '../rule';
import { Cell } from 'src/app/common/cell';
import { GridProvider } from 'src/app/game/grid-provider';
import { Observable, Subject } from 'rxjs';
import { LogicExplanation } from 'src/app/common/LogicExplanation';
import { CellResolver } from './CellResolver';

export class NakedSingleResolver extends CellResolver implements CellRule {

  private rule = 'Naked Single';
  private description = 'Resolves Cells which only has one possible Field';

  execute(cell: Cell, provider: GridProvider, selectedCells: Subject<LogicExplanation>): boolean {
    selectedCells.next(new LogicExplanation([cell], this.rule, this.description));
    if (cell.pencilmarks.length === 1) {
      this.resolveCell(cell);
      return true;
    } else {
      const cellsOfCurrentBox = provider.getCellsOfCurrentBox(cell.position, false);
      for (const pencilmark of cell.pencilmarks) {
        const cells = provider.getOtherCellsByPencilmarkOrSelection(cell, cellsOfCurrentBox, pencilmark);
        if (cells && cells.length === 0) {
          cell.pencilmarks = [pencilmark];
          this.resolveCell(cell);
          return true;
        }
      }
    }

  }

}
