import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SudokuGridComponent } from './sudoku-grid/sudoku-grid.component';

const routes: Routes = [
  {
    path: '',
    component: SudokuGridComponent
  },
  {
    path: ':grid',
    component: SudokuGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
