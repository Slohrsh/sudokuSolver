import { Rule } from '../rule';
import { GridProvider } from 'src/app/game/grid-provider';
import { Cell } from 'src/app/common/cell';
import { EliminatePencilmarksByConstraints } from './EliminatePencilmarksByConstraints';

export class EliminatePencilmarksByCurrentRowConstraints extends EliminatePencilmarksByConstraints {
  private rule = 'Current Row Constraints';
  private description = 'Removes all pencilmarks of Cell for current selections in this row';

  getRelevantCells(grid: GridProvider, cell: Cell, forUiPurpose: boolean): Cell[] {
    return grid.getCellsOfCurrentRow(cell.position, true && !forUiPurpose);
  }

  getRuleName(): string {
    return this.rule;
  }
  getDescription(): string {
    return this.description;
  }
}
