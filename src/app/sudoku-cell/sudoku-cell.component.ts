import { Component, OnInit, Input } from '@angular/core';
import { Cell, Position } from '../common/cell';
import { GameState } from '../game/grid-provider';


@Component({
  selector: 'app-sudoku-cell',
  templateUrl: './sudoku-cell.component.html',
  styleUrls: ['./sudoku-cell.component.scss']
})
export class SudokuCellComponent implements OnInit {

  @Input() cell: Cell;
  @Input() gameState: GameState;

  constructor() {
  }

  ngOnInit() {
  }

  isIdle(): boolean {
    return this.gameState === GameState.IDLE;
  }

}
