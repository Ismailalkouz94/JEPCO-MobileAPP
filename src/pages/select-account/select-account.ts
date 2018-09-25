import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PublicVarProvider } from '../../providers/public-var/public-var';
import { HomePage } from '../home/home';


/**
 * Generated class for the SelectAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-account',
  templateUrl: 'select-account.html',
})
export class SelectAccountPage {

  lang1: any;
  Lang: string;

  subAccount: any;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public translate: TranslateService, public storage: Storage) {
    this.storage.get('flagLanguage').then((val) => {
      if (val == null || val == "ar") {
        this.Lang = "English";
      }

      else {
        this.Lang = "عربي";
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectAccountPage');
    this.subAccount = PublicVarProvider.getProfile().customerSubAccountList;
  }

  switchLanguage1() {

    this.storage.get('flagLanguage').then((val) => {
      if (val == null || val == "ar") {
        this.translate.use('en');
        this.lang1 = "en";
        this.Lang = "عربي";
        this.storage.set('flagLanguage', this.lang1);

      }

      else {
        this.translate.use('ar');
        this.lang1 = "ar";
        this.Lang = "ُEnglish";
        this.storage.set('flagLanguage', this.lang1);
      }
    })


  }

  getProfile() {
    return PublicVarProvider.getProfile();
  }

  selectUser(customerSubAccount) {
    PublicVarProvider.setUser(customerSubAccount);
    this.navCtrl.setRoot(HomePage);
  }

}
