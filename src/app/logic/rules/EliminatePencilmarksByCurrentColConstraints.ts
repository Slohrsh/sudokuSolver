import { Rule } from '../rule';
import { GridProvider } from 'src/app/game/grid-provider';
import { Cell } from 'src/app/common/cell';
import { EliminatePencilmarksByConstraints } from './EliminatePencilmarksByConstraints';

export class EliminatePencilmarksByCurrentColConstraints extends EliminatePencilmarksByConstraints {
  getRelevantCells(grid: GridProvider, cell: Cell): Cell[] {
    return grid.getCellsOfCurrentColumn(cell.position, true);
  }
}
