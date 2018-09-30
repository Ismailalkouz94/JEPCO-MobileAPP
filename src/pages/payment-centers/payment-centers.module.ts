import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentCentersPage } from './payment-centers';

@NgModule({
  declarations: [
    // PaymentCentersPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentCentersPage),
  ],
})
export class PaymentCentersPageModule {}
