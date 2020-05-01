import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuCellComponent } from './sudoku-cell.component';

describe('SudokuCellComponent', () => {
  let component: SudokuCellComponent;
  let fixture: ComponentFixture<SudokuCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SudokuCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
