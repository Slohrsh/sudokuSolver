import { GridProvider } from '../game/grid-provider';
import { RuleObserver, Rule } from './rule';
import { Cell } from '../common/cell';
import { NakedSingleResolver } from './rules/NakedSingleResolver';
import { debug } from 'util';
import { Observable, Subject } from 'rxjs';
import { LogicExplanation } from '../common/LogicExplanation';

export class RulesExecutor {

  ITARATION_LIMIT = 100;

  gridProvider: GridProvider;

  selectedCells$: Subject<LogicExplanation>;

  constructor(gridProvider: GridProvider) {
    this.gridProvider = gridProvider;
  }

  getSelectedCellsSubject(): Subject<LogicExplanation> {
    this.selectedCells$ = new Subject();
    return this.selectedCells$;
  }


  async execute() {
    const rules: Rule[] = new RuleObserver().getImplementations();
    let iteration = 0;
    while (!this.isSolved()) {
      if (iteration > this.ITARATION_LIMIT) {
        return;
      }
      for (let y = 0; y < this.getSizeY(); y++) {
        for (let x = 0; x < this.getSizeX(); x++) {
          for (const rule of rules) {
            const cell = this.get(x, y);
            if (!cell.isSelected()) {
              rule.execute(this.get(x, y), this.gridProvider, this.selectedCells$);
              await this.delay(1000);
            }
          }
        }
      }
      iteration++;
    }
    alert('Yay i Solved it! :)');
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  get(x: number, y: number): Cell {
    return this.gridProvider.grid.get(x, y);
  }

  isSolved(): boolean {
    return this.gridProvider.isSolved();
  }

  getSizeX(): number {
    return this.gridProvider.SIZE_X;
  }

  getSizeY(): number {
    return this.gridProvider.SIZE_Y;
  }

}
