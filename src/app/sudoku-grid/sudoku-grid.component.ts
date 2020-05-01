import { Component, OnInit } from '@angular/core';
import { Cell, Position } from '../common/cell';
import { GridProvider } from '../game/grid-provider';
import { RulesExecutor } from '../logic/rule-executor';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component.html',
  styleUrls: ['./sudoku-grid.component.scss']
})
export class SudokuGridComponent implements OnInit {

  gridRaw: number[][] = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ];

  grid: Cell[][];

  constructor() {

  }

  ngOnInit() {
    this.grid = [];
    for(let y = 0; y < this.gridRaw.length; y++) {
      this.grid[y] = [];
      for(let x = 0; x < this.gridRaw.length; x++) {
        this.grid[y][x] = new Cell(this.gridRaw[y][x], new Position(x, y));
      }
    }

    const provider = new GridProvider(this.grid);
    const executor = new RulesExecutor(provider);

    executor.execute();

  }

}
