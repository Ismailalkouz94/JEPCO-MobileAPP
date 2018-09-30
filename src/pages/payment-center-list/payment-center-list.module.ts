import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentCenterListPage } from './payment-center-list';

@NgModule({
  declarations: [
    // PaymentCenterListPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentCenterListPage),
  ],
})
export class PaymentCenterListPageModule {}
