import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SudokuGridComponent } from './sudoku-grid/sudoku-grid.component';
import { SudokuCellComponent } from './sudoku-cell/sudoku-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    SudokuGridComponent,
    SudokuCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
