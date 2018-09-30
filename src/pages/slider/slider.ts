import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, Slides } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the SliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {
  @ViewChild('slides') slides: Slides;
  
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, private storage: Storage , public menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'myMenu');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      platform.setDir('ltr', true);

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }

  regAction() {
    this.navCtrl.setRoot(RegistrationPage);
    this.storage.set('hideTutorial', 'true');
}
 next() {
  this.slides.slideNext();
 }
}
