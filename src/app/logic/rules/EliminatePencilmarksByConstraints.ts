import { CellRule } from '../rule';
import { GridProvider } from 'src/app/game/grid-provider';
import { Cell } from 'src/app/common/cell';
import { CellResolver } from './CellResolver';
import { Subject } from 'rxjs';
import { LogicExplanation } from 'src/app/common/LogicExplanation';

export abstract class EliminatePencilmarksByConstraints extends CellResolver implements CellRule {

  execute(cell: Cell, grid: GridProvider, selectedCells: Subject<LogicExplanation>): boolean {
    if (cell.isSelected()) {
      return false;
    }
    let somethingChanged = false;
    const relevantCells = this.getRelevantCells(grid, cell, false);
    selectedCells.next(
      new LogicExplanation(
        Object.assign([], this.getRelevantCells(grid, cell, true)),
        this.getRuleName(),
        this.getDescription()
        )
      );
    for (const relevantCell of relevantCells) {
      if (!relevantCell.equals(cell)) {
        const hasChanged = cell.removePencilmark(relevantCell.selection);
        if (hasChanged) {
          somethingChanged = true;
        }
      }
      this.resolveCell(cell);
    }
    return somethingChanged;
  }

  abstract getRelevantCells(grid: GridProvider, cell: Cell, forUiPurpose: boolean): Cell[];
  abstract getRuleName(): string;
  abstract getDescription(): string;
}
