import { Component } from '@angular/core';
import { CalculatorPage } from '../../pages/calculator/calculator';
import { CalculatorWithoutSubPage } from '../../pages/calculator-without-sub/calculator-without-sub';

/**
 * Generated class for the TabsForCalcoulateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tabs-for-calcoulate',
  templateUrl: 'tabs-for-calcoulate.html'
})
export class TabsForCalcoulateComponent {

  tab1Root = CalculatorPage;
  tab2Root = CalculatorWithoutSubPage;

  constructor() {
    
  }

}
