import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PublicVarProvider } from '../../providers/public-var/public-var';
import { InvoicesPage } from '../invoices/invoices';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { LangServiceProvider } from '../../providers/lang-service/lang-service';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

/**
 * Generated class for the PreviousInvoicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-previous-invoices',
  templateUrl: 'previous-invoices.html',
})
export class PreviousInvoicesPage {
  billslLength: any;

  private requestOptions: any = {
    method: "",
    path: "",
    body: ''
  };

  subscriber: any = {
    bills: null,
    mConBalance: null,
    mConsumerName: null,
    mMeterNo: null,
    mOwnerName: null
  };

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private loading: LoadingServiceProvider, private lang: LangServiceProvider, private httpService: HttpServiceProvider) {

  }

  async ionViewDidLoad() {
    await this.GetBills();
  }

  goToInvoicesPage(bill) {
    this.navCtrl.push(InvoicesPage, { subscriber: this.subscriber, bill: bill });
  }


  async GetBills(payFlag = null) {

    this.loading.showLoading();

    this.requestOptions.path = "history/" + PublicVarProvider.getUser().fileNumber + "/" + ((payFlag) ? (payFlag) : (0));

    this.requestOptions.method = "GET";

    let response = await this.httpService.http_request(this.requestOptions);

    if (response.status == 200) {

      this.subscriber = response.json().body;

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

  getUser() {
    return PublicVarProvider.getUser();
  }

}
