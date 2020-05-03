import { Cell } from '../common/cell';
import { GridProvider } from '../game/grid-provider';
import { NakedSingleResolver } from './rules/NakedSingleResolver';
import { EliminatePencilmarksByCurrentBoxConstraints } from './rules/EliminatePencilmarksByCurrentBoxConstraints';
import { EliminatePencilmarksByCurrentColConstraints } from './rules/EliminatePencilmarksByCurrentColConstraints';
import { EliminatePencilmarksByCurrentRowConstraints } from './rules/EliminatePencilmarksByCurrentRowConstraints';
import { EliminatePencilmarksByNakedPairConstraints } from './rules/EliminatePencilmarksByNakedPairConstraints';
import { Observable, Subject } from 'rxjs';
import { LogicExplanation } from '../common/LogicExplanation';

export interface Rule {
  execute(cell: Cell, grid: GridProvider, selectedCells: Subject<LogicExplanation>): void;
}

export class RuleObserver {

  implementations: Array<Rule> = new Array();

  constructor() {
    this.register(new NakedSingleResolver());
    this.register(new EliminatePencilmarksByCurrentBoxConstraints());
    this.register(new EliminatePencilmarksByCurrentRowConstraints());
    this.register(new EliminatePencilmarksByCurrentColConstraints());
    //this.register(new EliminatePencilmarksByNakedPairConstraints());
  }

  getImplementations(): Rule[] {
    return this.implementations;
  }

  register(logic: Rule) {
    this.implementations.push(logic);
  }

}
