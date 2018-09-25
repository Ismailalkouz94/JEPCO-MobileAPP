import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviousInvoicesPage } from './previous-invoices';

@NgModule({
  declarations: [
    PreviousInvoicesPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviousInvoicesPage),
  ],
})
export class PreviousInvoicesPageModule {}
