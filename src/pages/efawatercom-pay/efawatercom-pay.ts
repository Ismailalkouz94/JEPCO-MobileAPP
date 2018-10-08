import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EfawatercomPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-efawatercom-pay',
  templateUrl: 'efawatercom-pay.html',
})
export class EfawatercomPayPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl: ViewController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EfawatercomPayPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
