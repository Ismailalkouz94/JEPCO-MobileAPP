import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AddSubProfilePage } from '../add-sub-profile/add-sub-profile';
import { PublicVarProvider } from '../../providers/public-var/public-var';
import { HomePage } from '../home/home';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { LangServiceProvider } from '../../providers/lang-service/lang-service';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ChangeUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-user',
  templateUrl: 'change-user.html',
})
export class ChangeUserPage {

  // @ViewChild('div') div;
  // @ViewChild('div') elemElem;


  private requestOptions: any = {
    method: "",
    path: "",
    body: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private httpService: HttpServiceProvider, private loading: LoadingServiceProvider, private lang: LangServiceProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
  }

  goToAddSubProfile() {
    this.navCtrl.push(AddSubProfilePage);
  }


  getProfile() {
    return PublicVarProvider.getProfile();
  }

  getUser() {
    return PublicVarProvider.getUser();
  }

  getUsers() {
    return PublicVarProvider.getProfile().customerSubAccountList.filter(subAccount => subAccount.fileNumber != PublicVarProvider.getUser().fileNumber);
  }

  selectUser(customerSubAccount) {
    PublicVarProvider.setUser(customerSubAccount);
    this.navCtrl.pop();
  }

  async DeletSubAccount(customerSubAccount) {

    this.loading.showLoading();
    //request
    this.requestOptions.path = "sub/delete/" + customerSubAccount.fileNumber;

    this.requestOptions.method = "PUT";

    this.requestOptions.body = { nationalNumber: await this.storage.get('flagNationalNumber').then(response => response) };

    let response = await this.httpService.http_request(this.requestOptions);

    console.log('response', response);

    if (response.status == 200) {
      PublicVarProvider.getProfile().customerSubAccountList = (response.json().body);

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

  confirmDelete(customerSubAccount) {
    let alert = this.alertCtrl.create({
      title: this.lang.getTranslate('confirmation'),
      message: this.lang.getTranslate('ConfOK'),
      buttons: [
        {
          text: this.lang.getTranslate('Cancel'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.lang.getTranslate('Ok'),
          handler: () => {
            this.DeletSubAccount(customerSubAccount);
          }
        }
      ]
    });
    alert.present();

  }


}
