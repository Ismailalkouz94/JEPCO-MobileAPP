import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PopoverController, NavController, Platform } from 'ionic-angular';
import { PopoverPhoneNumbersComponent } from '../popover-phone-numbers/popover-phone-numbers';
import { ChangeUserPage } from '../../pages/change-user/change-user';
import { InAppBrowser ,InAppBrowserOptions} from '@ionic-native/in-app-browser';



/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  lang1: any;
  Lang:string;
  platform:any;

  constructor(platform: Platform,public navCtrl: NavController, public popoverCtrl: PopoverController,public translate: TranslateService,  public storage: Storage, private iab: InAppBrowser) {
    this.platform = platform;

    this.storage.get('flagLanguage').then((val) => {
      if (val == null || val == "ar") {
        this.Lang="English";
      }

      else {
        this.Lang="عربي";
      }
    })
  }

  // switchLanguage1() {
  //   this.translate.use(this.lang1);
  //   this.storage.set('flagLanguage', this.lang1);
  // }

  switchLanguage1() {
  
    this.storage.get('flagLanguage').then((val) => {
      if (val == null || val == "ar") {
        this.translate.use('en');
        this.lang1 = "en";
        this.Lang="عربي";
        this.storage.set('flagLanguage', this.lang1);

      }

      else {
        this.translate.use('ar');
        this.lang1 = "ar";
        this.Lang="ُEnglish";
        this.storage.set('flagLanguage', this.lang1);
      }
    })

  
  }

 

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPhoneNumbersComponent);
    popover.present({
      ev: myEvent
    });
  }

  goToChangeUser(){
    this.navCtrl.push(ChangeUserPage);
  }

  linkFacebook(){
    const options:InAppBrowserOptions={
      zoom:'no',
      toolbar:'yes',
      hardwareback:'yes'
    }
    const browser = this.iab.create('https://web.facebook.com/Jepco.jo/','',options);

  }

  exitApp(){
    this.platform.exitApp();
 }
}
