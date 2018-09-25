import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSubProfilePage } from './add-sub-profile';

@NgModule({
  declarations: [
    AddSubProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(AddSubProfilePage),
  ],
})
export class AddSubProfilePageModule {}
