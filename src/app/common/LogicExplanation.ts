import { Cell } from './cell';

export class LogicExplanation {
  cells: Cell[];
  rule: string;
  description: string;

  constructor(cells: Cell[], rule: string, description: string) {
    this.cells = cells;
    this.rule = rule;
    this.description = description;
  }
}
