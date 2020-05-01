import { Component, OnInit, Input } from '@angular/core';
import { Cell, Position } from '../common/cell';


@Component({
  selector: 'app-sudoku-cell',
  templateUrl: './sudoku-cell.component.html',
  styleUrls: ['./sudoku-cell.component.scss']
})
export class SudokuCellComponent implements OnInit {

  @Input() cell: Cell;

  constructor() {
  }

  ngOnInit() {
  }

}
