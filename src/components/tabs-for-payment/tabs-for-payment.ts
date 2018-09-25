import { Component } from '@angular/core';
// import { PaymentCentersPage } from '../../pages/payment-centers/payment-centers';
import { PaymentCenterListPage } from '../../pages/payment-center-list/payment-center-list';
import { PaymentCenterMapPage } from '../../pages/payment-center-map/payment-center-map';

/**
 * Generated class for the TabsForPaymentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tabs-for-payment',
  templateUrl: 'tabs-for-payment.html'
})
export class TabsForPaymentComponent {

  tab1Root = PaymentCenterMapPage;
  tab2Root = PaymentCenterListPage;

  constructor() {
    
  }

}
