import { CellRule } from '../rule';
import { GridProvider } from 'src/app/game/grid-provider';
import { Cell } from 'src/app/common/cell';
import { Subject } from 'rxjs';
import { LogicExplanation } from 'src/app/common/LogicExplanation';

export class EliminatePencilmarksByCurrentBoxConstraints implements CellRule {

  private rule = 'Current Box Constraints';
  private description = 'Removes all pencilmarks of Cell for current selections in this box';

  execute(cell: Cell, grid: GridProvider, selectedCells: Subject<LogicExplanation>): boolean {
    const cellsOfCurrentBox = grid.getCellsOfCurrentBox(cell.position, true);
    let somethingChanged = false;
    selectedCells.next(
      new LogicExplanation(
        Object.assign([],  grid.getCellsOfCurrentBox(cell.position, false)),
        this.rule,
        this.description)
      );

    for (const cellOfCurrentBox of cellsOfCurrentBox) {
      if (!cellOfCurrentBox.equals(cell)) {
        if (cell.containsPencilmark(cellOfCurrentBox.selection)) {
          const hasChanged = cell.removePencilmark(cellOfCurrentBox.selection);
          if (hasChanged) {
            somethingChanged = true;
          }
        }
        if (cell.pencilmarks.length === 1) {
          cell.selection = cell.pencilmarks[0];
          cell.pencilmarks = [];
          somethingChanged = true;
        }
      }
    }
    return somethingChanged;
  }
}
