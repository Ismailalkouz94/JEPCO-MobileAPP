import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { PopoverController, NavController, Platform } from 'ionic-angular';
import { PopoverPhoneNumbersComponent } from '../popover-phone-numbers/popover-phone-numbers';
import { ChangeUserPage } from '../../pages/change-user/change-user';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Popover } from 'ionic-angular/components/popover/popover';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { App } from 'ionic-angular/components/app/app';



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
  Lang: string;
  platform: any;
  popover: Popover;

  constructor(platform: Platform,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public translate: TranslateService,
    public storage: Storage,
    private iab: InAppBrowser,
    private app: App) {
    this.platform = platform;
    this.storage.get('flagLanguage').then((val) => {
      if (val == null || val == "ar") {
        this.Lang = "English";
      }

      else {
        this.Lang = "عربي";
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



  presentPopover(myEvent) {
    this.popover = this.popoverCtrl.create(PopoverPhoneNumbersComponent);
    this.popover.present({
      ev: myEvent
    });
  }

  goToChangeUser() {

    this.viewCtrl.dismiss();
    this.app.getRootNav().push(ChangeUserPage);

    // this.navCtrl.push(ChangeUserPage);
    // this.viewCtrl.dismiss();
  }

  linkFacebook() {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      toolbar: 'yes',
      hardwareback: 'yes'
    }
    const browser = this.iab.create('https://web.facebook.com/Jepco.jo/', '', options);

  }

  exitApp() {
    this.platform.exitApp();
  }
}
