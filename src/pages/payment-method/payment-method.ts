import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ImageModalPage } from '../../pages/imageModal/imageModal';
import { EfawatercomPayPage } from '../../pages/efawatercom-pay/efawatercom-pay'

/**
 * Generated class for the PaymentMethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html',
})
export class PaymentMethodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodPage');
  }

  openImage() {
    let imgModal = this.modalCtrl.create(ImageModalPage);
    imgModal.present();
  }

  openEfawatercomImage(){
    let imgModal = this.modalCtrl.create(EfawatercomPayPage);
    imgModal.present();
  }

}
