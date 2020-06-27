import { CellRule } from '../rule';
import { LogicExplanation } from 'src/app/common/LogicExplanation';
import { GridProvider } from 'src/app/game/grid-provider';
import { Cell, Position } from 'src/app/common/cell';
import { Subject } from 'rxjs';
import { ValidationResult } from './ValidationResult';

export class GridValidation {

  gridProvider: GridProvider;

  constructor(gridProvider: GridProvider) {
    this.gridProvider = gridProvider;
  }

  validate(): ValidationResult {

    const validationResult = new ValidationResult();

    for (let i = 0; i < 9; i++) {
      validationResult.addAll(this.validateBox(new Position(4, i)));
      validationResult.addAll(this.validateRow(new Position(((i % 3) * 3) % 7, (Math.floor(i / 3) * 3) % 7)));
      validationResult.addAll(this.validateColumn(new Position(i % 3, Math.floor(i / 3))));
    }

    return validationResult;
  }


  validateBox(position: Position): Cell[] {
    const cellsToCheck = this.gridProvider.getCellsOfCurrentBox(position, false);
    return this.checkUniqueSelection(cellsToCheck);
  }


  validateColumn(position: Position): Cell[] {
    const cellsToCheck = this.gridProvider.getCellsOfCurrentColumn(position, false);
    return this.checkUniqueSelection(cellsToCheck);
  }


  validateRow(position: Position): Cell[] {
    const cellsToCheck = this.gridProvider.getCellsOfCurrentRow(position, false);
    return this.checkUniqueSelection(cellsToCheck);
  }

  checkUniqueSelection(cellsToCheck: Cell[]): Cell[] {
    const invalidCells: Cell[] = [];
    for (let i = 1; i < 10; i++) {
      const foundCells: Cell[] = [];
      for (const cell of cellsToCheck) {
        if (cell.selection === i) {
          foundCells.push(cell);
        }
      }
      if (foundCells.length > 1) {
        for (const cell of foundCells) {
          invalidCells.push(cell);
        }
      }
    }
    return invalidCells;
  }

}
