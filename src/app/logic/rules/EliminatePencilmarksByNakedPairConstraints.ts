import { Rule } from '../rule';
import { GridProvider } from 'src/app/game/grid-provider';
import { Cell, Position } from 'src/app/common/cell';
import { CellResolver } from './CellResolver';
import { Subject } from 'rxjs';
import { LogicExplanation } from 'src/app/common/LogicExplanation';

export class EliminatePencilmarksByNakedPairConstraints extends CellResolver implements Rule {

  execute(cell: Cell, grid: GridProvider, selectedCells: Subject<LogicExplanation>): void {
    const cellsOfCurrentBox = grid.getCellsOfCurrentBox(cell.position, false);
    const center = new Position(4, cell.position.box);
    this.eliminateSameRowPrediction(center, cellsOfCurrentBox, grid);
    this.eliminateSameColumnPrediction(center, cellsOfCurrentBox, grid);
  }

  eliminateSameRowPrediction(center: Position, cellsOfCurrentBox: Cell[], grid: GridProvider) {
    const predictionsAtFirstRow = this.getPencilmarksAtRow(cellsOfCurrentBox, center.box - 1);
    const predictionsAtSecondRow = this.getPencilmarksAtRow(cellsOfCurrentBox, center.box);
    const predictionsAtThirdRow = this.getPencilmarksAtRow(cellsOfCurrentBox, center.box + 1);

    this.eliminateSameLinePredictionIfPossible(
      new Position(center.cell, center.box - 1),
      grid,
      predictionsAtFirstRow,
      predictionsAtSecondRow,
      predictionsAtThirdRow,
      cellsOfCurrentBox);
    this.eliminateSameLinePredictionIfPossible(
      new Position(center.cell, center.box),
      grid,
      predictionsAtSecondRow,
      predictionsAtFirstRow,
      predictionsAtThirdRow,
      cellsOfCurrentBox);
    this.eliminateSameLinePredictionIfPossible(
      new Position(center.cell, center.box + 1),
      grid,
      predictionsAtThirdRow,
      predictionsAtFirstRow,
      predictionsAtSecondRow,
      cellsOfCurrentBox);
  }

  eliminateSameColumnPrediction(center: Position, cellsOfCurrentBox: Cell[], grid: GridProvider) {
    const predictionsAtFirstColumn = this.getPencilmarksAtColumn(cellsOfCurrentBox, center.cell - 1);
    const predictionsAtSecondColumn = this.getPencilmarksAtColumn(cellsOfCurrentBox, center.cell);
    const predictionsAtThirdColumn = this.getPencilmarksAtColumn(cellsOfCurrentBox, center.cell + 1);

    this.eliminateSameColumnPencilmarkIfPossible(
      new Position(center.cell - 1, center.box),
      grid,
      predictionsAtFirstColumn,
      predictionsAtSecondColumn,
      predictionsAtThirdColumn,
      cellsOfCurrentBox);

    this.eliminateSameColumnPencilmarkIfPossible(
      new Position(center.cell, center.box),
      grid,
      predictionsAtSecondColumn,
      predictionsAtFirstColumn,
      predictionsAtThirdColumn,
      cellsOfCurrentBox);

    this.eliminateSameColumnPencilmarkIfPossible(
      new Position(center.cell + 1, center.box),
      grid,
      predictionsAtThirdColumn,
      predictionsAtFirstColumn,
      predictionsAtSecondColumn,
      cellsOfCurrentBox);
  }

  eliminateSameLinePredictionIfPossible(
    pos: Position,
    grid: GridProvider,
    inputLineToCheck: number[],
    firstLineToRemove: number[],
    secondLineToRemove: number[],
    cellsOfCurrentBox: Cell[]
  ) {

    const lineToCheck = Object.assign([], inputLineToCheck);
    lineToCheck.filter(x => !firstLineToRemove.includes(x));
    lineToCheck.filter(x => !secondLineToRemove.includes(x));
    if (lineToCheck.length > 0) {
      const cellsOfCurrentRow = grid.getCellsOfCurrentRow(pos, false);
      cellsOfCurrentRow.filter(x => !cellsOfCurrentBox.includes(x));
      for (const cellOfCurrentRow of cellsOfCurrentRow) {
        for (const pencilmark of lineToCheck) {
          if (!cellOfCurrentRow.isSelected()) {
            cellOfCurrentRow.removePencilmark(pencilmark);
            this.resolveCell(cellOfCurrentRow);
          }
        }
      }
    }
  }

  eliminateSameColumnPencilmarkIfPossible(
    pos: Position,
    grid: GridProvider,
    inputLineToCheck: number[],
    firstLineToRemove: number[],
    secondLineToRemove: number[],
    cellsOfCurrentBox: Cell[]
  ) {

    const columnToCheck = Object.assign([], inputLineToCheck);
    columnToCheck.filter(x => !firstLineToRemove.includes(x));
    columnToCheck.filter(x => !secondLineToRemove.includes(x));
    if (columnToCheck.length > 0) {
      const cellsOfCurrentColumn = grid.getCellsOfCurrentColumn(pos, false);
      cellsOfCurrentColumn.filter(x => !cellsOfCurrentBox.includes(x));
      for (const cellOfCurrentColumn of cellsOfCurrentColumn) {
        for (const prediction of columnToCheck) {
          if (!cellOfCurrentColumn.isSelected()) {
            cellOfCurrentColumn.removePencilmark(prediction);
            this.resolveCell(cellOfCurrentColumn);
          }
        }
      }
    }
  }

  getPencilmarksAtRow(cellsOfCurrentBox: Cell[], line: number): number[] {
    const cellsOfCurrentRow = cellsOfCurrentBox.filter(cell => cell.position.box === line);
    return this.getPencilmarks(cellsOfCurrentRow);
  }

  getPencilmarksAtColumn(cellsOfCurrentBox: Cell[], column: number): number[] {
    const cellsOfCurrentColumn = cellsOfCurrentBox.filter(cell => cell.position.cell === column);
    return this.getPencilmarks(cellsOfCurrentColumn);
  }

  getPencilmarks(cellsOfCurrentRow: Cell[]): number[] {
    const pencilmarks: number[] = [];
    for (const cell of cellsOfCurrentRow) {
      if (cell.pencilmarks != null) {
        for (const pencilmark of cell.pencilmarks) {
          if (pencilmarks.includes(pencilmark)) {
            pencilmarks.push(pencilmark);
          }
        }
      }
    }
    return pencilmarks;
  }

}
