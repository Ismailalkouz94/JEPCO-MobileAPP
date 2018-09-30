import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalculatorWithoutSubPage } from './calculator-without-sub';

@NgModule({
  declarations: [
    // CalculatorWithoutSubPage,
  ],
  imports: [
    IonicPageModule.forChild(CalculatorWithoutSubPage),
  ],
})
export class CalculatorWithoutSubPageModule {}
