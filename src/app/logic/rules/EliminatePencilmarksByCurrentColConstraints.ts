import { Rule } from '../rule';
import { GridProvider } from 'src/app/game/grid-provider';
import { Cell } from 'src/app/common/cell';
import { EliminatePencilmarksByConstraints } from './EliminatePencilmarksByConstraints';

export class EliminatePencilmarksByCurrentColConstraints extends EliminatePencilmarksByConstraints {

  private rule = 'Current Column Constraints';
  private description = 'Removes all pencilmarks of Cell for current selections in this column';

  getRelevantCells(grid: GridProvider, cell: Cell, forUiPurpose: boolean): Cell[] {
    return grid.getCellsOfCurrentColumn(cell.position, true && !forUiPurpose);
  }

  getRuleName(): string {
    return this.rule;
  }
  getDescription(): string {
    return this.description;
  }
}
