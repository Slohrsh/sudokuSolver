import { BoxRule } from '../rule';
import { GridProvider } from 'src/app/game/grid-provider';
import { Cell, Position } from 'src/app/common/cell';
import { CellResolver } from './CellResolver';
import { Subject } from 'rxjs';
import { LogicExplanation } from 'src/app/common/LogicExplanation';

export class EliminatePencilmarksByNakedPairConstraints extends CellResolver implements BoxRule {

  private rule = 'Naked Pair Constraints';
  private description = 'You can remove all pencilmarks for row or Cell if there is a naked pair in the box';

  execute(currentBox: Position, provider: GridProvider, selectedCells: Subject<LogicExplanation>): boolean {

    const nakedPairInRow = this.getNakedPairs(currentBox, provider, this.isNakedPairInRow);
    const nakedPairInColumn = this.getNakedPairs(currentBox, provider, this.isNakedPairInColumn);

    this.fillLogicExplanation(nakedPairInRow, nakedPairInColumn, selectedCells);

    const rowChanged = this.handleNakedPair(nakedPairInRow, provider, this.getCellsOfRow);
    const colChanged = this.handleNakedPair(nakedPairInColumn, provider, this.getCellsOfColumn);
    return rowChanged || colChanged;
  }

  private handleNakedPair(
    nakedPairInColumn: Map<number, Cell[]>,
    provider: GridProvider,
    getRelevantCells: (position: Position, provider: GridProvider) => Cell[]) {

    let somethingChanged = false;
    if (nakedPairInColumn) {
      nakedPairInColumn.forEach((value: Cell[], key: number) => {
        const cells = getRelevantCells(value[0].position, provider);
        for (const cell of cells) {
          let isNakedPairCell = false;
          for (const nakedPair of value) {
            if (nakedPair.equals(cell)) {
              isNakedPairCell = true;
              break;
            }
          }
          if (!isNakedPairCell) {
            const hasChanged = cell.removePencilmark(key);
            if(hasChanged) {
              somethingChanged = true;
            }
          }
        }
      });
    }
    return somethingChanged;
  }

  private getNakedPairs(currentBox: Position, provider: GridProvider, isNakedPair: (cell: Cell[]) => boolean):
    Map<number, Cell[]> {
    const cellsOfCurrentBox = provider.getCellsOfCurrentBox(currentBox, false);
    const nakedPairs = new Map();
    for (let i = 1; i < 10; i++) {
      const cells = provider.getAllCellsByPencilmark(cellsOfCurrentBox, i);
      if (cells.length > 1) {
        if (isNakedPair(cells)) {
          nakedPairs.set(i, cells);
        }
      }
    }

    return nakedPairs;
  }

  private isNakedPairInColumn(cells: Cell[]): boolean {
    for (const cell of cells) {
      for (const cellToCompare of cells) {
        let isSameRow = false;
        for (let i = 0; i < 3; i++) {
          const column = ((i * 3) % 7) + cell.position.cell % 3;
          if (cellToCompare.position.cell === column) {
            isSameRow = true;
            break;
          }
        }
        if (!isSameRow) {
          return false;
        }
      }
    }
    return true;
  }

  private isNakedPairInRow(cells: Cell[]): boolean {
    for (const cell of cells) {
      for (const cellToCompare of cells) {
        let isSameRow = false;
        for (let i = 0; i < 3; i++) {
          const row = i + (Math.floor(cell.position.cell / 3) * 3);
          if (cellToCompare.position.cell === row) {
            isSameRow = true;
            break;
          }
        }
        if (!isSameRow) {
          return false;
        }
      }
    }
    return true;
  }

  private getCellsOfColumn(position: Position, provider: GridProvider): Cell[] {
    return provider.getCellsOfCurrentColumn(position, false);
  }

  private getCellsOfRow(position: Position, provider: GridProvider): Cell[] {
    return provider.getCellsOfCurrentRow(position, false);
  }

  private fillLogicExplanation(
    nakedPairInRow: Map<number, Cell[]>,
    nakedPairInColumn: Map<number, Cell[]>,
    selectedCells: Subject<LogicExplanation>) {

    const usedCells: Cell[] = [];
    nakedPairInRow.forEach((values: Cell[]) => {
      for (const val of values) {
        usedCells.push(val);
      }
    });
    nakedPairInColumn.forEach((values: Cell[]) => {
      for (const val of values) {
        usedCells.push(val);
      }
    });
    selectedCells.next(new LogicExplanation(Object.assign([], usedCells), this.rule, this.description));
  }
}
