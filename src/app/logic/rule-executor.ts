import { GridProvider } from '../game/grid-provider';
import { RuleObserver, CellRule, BoxRule } from './rule';
import { Cell, Position } from '../common/cell';
import { NakedSingleResolver } from './rules/NakedSingleResolver';
import { debug } from 'util';
import { Observable, Subject } from 'rxjs';
import { LogicExplanation } from '../common/LogicExplanation';
import { Config } from '../game/config';

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
    const cellRules: CellRule[] = new RuleObserver().getCellRules();
    const boxRules: BoxRule[] = new RuleObserver().getBoxRules();
    const lastCheckRules: CellRule[] = new RuleObserver().getLastCheckRules();

    const config = Config.getInstance();

    let iteration = 0;
    let somethingChanged = true;
    while (!this.isSolved()) {
      if (iteration > this.ITARATION_LIMIT) {
        break;
      }
      if (!somethingChanged) {
        alert('Sorry I\'m stuck');
        break;
      }
      somethingChanged = false;
      for (let box = 0; box < this.getSizeY(); box++) {
        for (let cell = 0; cell < this.getSizeX(); cell++) {
          for (const rule of cellRules) {
            const currentCell = this.get(cell, box);
            if (!currentCell.isSelected()) {
              const hasChanged = rule.execute(this.get(cell, box), this.gridProvider, this.selectedCells$);
              if (hasChanged) {
                somethingChanged = hasChanged;
              }
              await this.delay(config.sleepTime);
            }
          }
        }

        for (const rule of boxRules) {
          const hasChanged = rule.execute(new Position(4, box), this.gridProvider, this.selectedCells$);
          if (hasChanged) {
            somethingChanged = hasChanged;
          }
          await this.delay(config.sleepTime);
        }

        for (const cell of this.gridProvider.getCellsOfCurrentBox(new Position(4, box), false)) {
          if (!cell.isSelected()) {
            for (const rule of lastCheckRules) {
              const hasChanged = rule.execute(cell, this.gridProvider, this.selectedCells$);
              if (hasChanged) {
                somethingChanged = hasChanged;
              }
              await this.delay(config.sleepTime);
            }
          }
        }
      }
      iteration++;
    }
    //alert('Yay i Solved it! :)');
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
