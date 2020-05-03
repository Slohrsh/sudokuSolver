import { Component, OnInit, HostListener } from '@angular/core';
import { Cell, Position } from '../common/cell';
import { GridProvider, GameState } from '../game/grid-provider';
import { RulesExecutor } from '../logic/rule-executor';
import { ActivatedRoute } from '@angular/router';
import { LogicExplanation } from '../common/LogicExplanation';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component.html',
  styleUrls: ['./sudoku-grid.component.scss']
})
export class SudokuGridComponent implements OnInit {

  private gridRaw: number[][] = [
    [0, 0, 0, 6, 8, 0, 1, 9, 0],
    [2, 6, 0, 0, 7, 0, 0, 0, 4],
    [7, 0, 1, 0, 9, 0, 5, 0, 0],
    [8, 2, 0, 0, 0, 4, 0, 5, 0],
    [1, 0, 0, 6, 0, 2, 0, 0, 3],
    [0, 4, 0, 9, 0, 0, 0, 2, 8],
    [0, 0, 9, 0, 4, 0, 7, 0, 3],
    [3, 0, 0, 0, 5, 0, 0, 1, 8],
    [0, 7, 4, 0, 3, 6, 0, 0, 0]
  ];

  grid: Cell[][];
  private executor: RulesExecutor;

  private selectedCell: Cell;

  gameState: GameState = GameState.IDLE;

  currentExecutedRule: string;
  currentExecutedRuleDescription: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  @HostListener('document:keypress', ['$event'])
  setCell(event: KeyboardEvent) {
    const num = Number(event.key);
    if (!isNaN(num)) {
      if (this.gameState === GameState.IDLE) {
        this.selectedCell.isGivenValue = true;
      }
      this.selectedCell.selection = num;
      this.selectedCell.pencilmarks = [];
    }
  }

  ngOnInit() {

    this.grid = [];
    const givenGrid = this.route.snapshot.paramMap.get('grid');
    if (givenGrid) {
      this.initGivenGrid(givenGrid);
    } else {
      this.initDefaultGrid();
    }

    const provider = new GridProvider(this.grid);
    this.executor = new RulesExecutor(provider);

    console.log(this.generateExportGrid());
  }

  execute() {
    this.gameState = GameState.SOLVE;

    this.executor.getSelectedCellsSubject().subscribe((explanation: LogicExplanation) => {
      this.highlightSelectedCells(explanation.cells);
      this.currentExecutedRule = explanation.rule;
      this.currentExecutedRuleDescription = explanation.description;
    });

    this.executor.execute();
  }



  highlightSelectedCells(cells: Cell[]) {
    this.unselectAll();
    for (const cell of cells) {
      const cellClass = 'cell-[' + cell.position.box + '][' + cell.position.cell + ']';
      const cellsToHighlight = document.getElementsByClassName(cellClass);
      Array.prototype.forEach.call(cellsToHighlight, (cellToHighlight) => {
        cellToHighlight.classList.add('focused');
      });
    }
  }

  unselectAll() {
    const highilghtedElements = document.getElementsByClassName('focused');
    if (highilghtedElements != null) {
      const len = highilghtedElements.length;
      for (let i = 0; i < len; i++) {
        highilghtedElements[0].classList.remove('focused');
      }
    }
  }


  clear(clearAll: boolean) {
    this.gameState = GameState.IDLE;
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid.length; x++) {
        if (clearAll || !this.grid[y][x].isGivenValue) {
          this.grid[y][x] = new Cell(0, new Position(x, y));
        }
      }
    }
  }

  clearAllPencilmarks() {
    this.gameState = GameState.IDLE;
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid.length; x++) {
        this.grid[y][x].pencilmarks = [];
      }
    }
  }

  startPlaying() {
    this.gameState = GameState.PLAY;
    this.clearAllPencilmarks();
  }

  setSelectedCell(cell: Cell, element) {
    if (document.getElementsByClassName('focused').length > 0) {
      document.getElementsByClassName('focused')[0].classList.remove('focused');
    }

    element.target.closest('.cell').classList.add('focused');
    this.selectedCell = cell;
  }

  generateExportGrid(): string {
    const exportGrid = [];
    let emptyCount = 0;
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid.length; x++) {
        const cell = this.grid[y][x];
        if (cell.isGivenValue) {
          if (emptyCount > 0) {
            if (emptyCount < 10) {
              exportGrid.push(0);
            }
            exportGrid.push(emptyCount);
          }
          exportGrid.push(cell.selection);
          emptyCount = 0;
        } else {
          if (emptyCount === 0) {
            exportGrid.push('x');
          }
          emptyCount++;
        }
      }
    }

    if (emptyCount > 0) {
      if (emptyCount < 10) {
        exportGrid.push(0);
      }
      exportGrid.push(emptyCount);
    }

    return exportGrid.join('');
  }

  initGivenGrid(givenGrid: string) {
    const vals = [...givenGrid];
    let x = 0;
    let y = -1;
    let emptyCells = false;
    let emptyCellsCount = 0;
    let cellCount = 0;
    let index = 0;
    for (let i = 0; i < 81; i++) {
      x = i % 9;
      if (x === 0) {
        y++;
        this.grid[y] = [];
      }

      if (!emptyCells && vals[index] === 'x') {
        emptyCells = true;
        emptyCellsCount = Number(vals[index + 1] + vals[index + 2]);
        if (emptyCellsCount > 3) {
          const b = 1;
        }
        index = index + 3;
      }

      if (emptyCells) {
        this.grid[y][x] = new Cell(0, new Position(x, y));
        emptyCellsCount--;
      } else {
        this.grid[y][x] = new Cell(Number(vals[index]), new Position(x, y));
        index++;
      }

      if (emptyCellsCount < 1) {
        emptyCells = false;
      }
      cellCount++;
      if (cellCount > 81) {
        const a = 1;
      }
    }

    if (index !== givenGrid.length || emptyCellsCount > 0) {
      alert('Invalid Input Grid: \'' + givenGrid + '. Show default grid.');
      this.initDefaultGrid();
    }
  }


  private initDefaultGrid() {
    for (let y = 0; y < this.gridRaw.length; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.gridRaw.length; x++) {
        this.grid[y][x] = new Cell(this.gridRaw[y][x], new Position(x, y));
      }
    }
  }
}
