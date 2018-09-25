import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SliderPage } from '../slider/slider';


/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  lang: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService, private storage: Storage) {
    this.lang = 'ar';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }


  switchLanguage() {
    this.translate.use(this.lang);
    this.storage.set('flagLanguage', this.lang);
  }

  nextAction() {
    this.navCtrl.setRoot(SliderPage);
    
  }

}
