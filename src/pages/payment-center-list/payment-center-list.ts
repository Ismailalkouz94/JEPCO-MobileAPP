import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { PublicVarProvider } from '../../providers/public-var/public-var';
import { InvoicesPage } from '../invoices/invoices';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { LangServiceProvider } from '../../providers/lang-service/lang-service';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { MapModalPage } from '../map-modal/map-modal';

/**
 * Generated class for the PaymentCenterListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-center-list',
  templateUrl: 'payment-center-list.html',
})
export class PaymentCenterListPage {


 

  centersList: any ;
  
  private requestOptions: any = {
    method: "",
    path: "",
    body: ''
  };
   

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private loading: LoadingServiceProvider, private lang: LangServiceProvider, private httpService: HttpServiceProvider,private modalCtrl :ModalController) {
  }

  async ionViewDidLoad() {
    await this.GetCenters();
  }

  async GetCenters() {

    this.loading.showLoading();

    this.requestOptions.path = "centers";

    this.requestOptions.method = "GET";

    let response = await this.httpService.http_request(this.requestOptions);

    if (response.status == 200) {

      this.centersList = response.json().body;

      this.loading.dismissLoading();

    } else {
      this.loading.dismissLoading();

      let alert = this.alertCtrl.create({
        title: this.lang.getTranslate('Error'),
        subTitle: this.lang.getTranslate(response.key),
        buttons: [this.lang.getTranslate('Ok')]
      });
      alert.present();
    }
  }

  openMap(center) {
    let mModal = this.modalCtrl.create(MapModalPage , {center: center});
    mModal.present();
  }

}
