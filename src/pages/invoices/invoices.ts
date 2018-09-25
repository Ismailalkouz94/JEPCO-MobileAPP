import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PublicVarProvider } from '../../providers/public-var/public-var';

/**
 * Generated class for the InvoicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
})
export class InvoicesPage {

  subscriber: any = {
    mConBalance: null,
    mConsumerName: null,
    mMeterNo: null,
    mOwnerName: null
  };

  bill: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.subscriber = this.navParams.get('subscriber');

    this.bill = this.navParams.get('bill');
  }

  ionViewDidLoad() {
  
  }

  getUser(){
    return PublicVarProvider.getUser();
  }

}
