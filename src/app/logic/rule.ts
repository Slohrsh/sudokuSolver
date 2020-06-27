import { Cell, Position } from '../common/cell';
import { GridProvider } from '../game/grid-provider';
import { NakedSingleResolver } from './rules/NakedSingleResolver';
import { EliminatePencilmarksByCurrentBoxConstraints } from './rules/EliminatePencilmarksByCurrentBoxConstraints';
import { EliminatePencilmarksByCurrentColConstraints } from './rules/EliminatePencilmarksByCurrentColConstraints';
import { EliminatePencilmarksByCurrentRowConstraints } from './rules/EliminatePencilmarksByCurrentRowConstraints';
import { EliminatePencilmarksByNakedPairConstraints } from './rules/EliminatePencilmarksByNakedPairConstraints';
import { Subject } from 'rxjs';
import { LogicExplanation } from '../common/LogicExplanation';

export interface CellRule {
  execute(cell: Cell, provider: GridProvider, selectedCells: Subject<LogicExplanation>): boolean;
}

export interface BoxRule {
  execute(currentBox: Position, provider: GridProvider, selectedCells: Subject<LogicExplanation>): boolean;
}

export class RuleObserver {

  cellLogic: Array<CellRule> = new Array();
  boxLogic: Array<BoxRule> = new Array();
  lastCheckLogic: Array<CellRule> = new Array();

  constructor() {
    // Cell Logic
    this.registerCellLogic(new EliminatePencilmarksByCurrentBoxConstraints());
    this.registerCellLogic(new EliminatePencilmarksByCurrentRowConstraints());
    this.registerCellLogic(new EliminatePencilmarksByCurrentColConstraints());

    // Box Logic
    this.registerBoxLogic(new EliminatePencilmarksByNakedPairConstraints());

    // Logic which should checkt at the end of a box
    this.registerLastCheckLogic(new NakedSingleResolver());
  }

  getCellRules(): CellRule[] {
    return this.cellLogic;
  }

  getBoxRules(): BoxRule[] {
    return this.boxLogic;
  }

  getLastCheckRules(): CellRule[] {
    return this.lastCheckLogic;
  }

  registerLastCheckLogic(logic: CellRule) {
    this.lastCheckLogic.push(logic);
  }


  registerCellLogic(logic: CellRule) {
    this.cellLogic.push(logic);
  }

  registerBoxLogic(logic: BoxRule) {
    this.boxLogic.push(logic);
  }

}
