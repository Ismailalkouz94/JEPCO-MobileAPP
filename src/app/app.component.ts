import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';


import { RegistrationPage } from '../pages/registration/registration';

import { Storage } from '@ionic/storage';
import { WelcomePage } from '../pages/welcome/welcome';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';
import { LangServiceProvider } from '../providers/lang-service/lang-service';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { PublicVarProvider } from '../providers/public-var/public-var';
import { SelectAccountPage } from '../pages/select-account/select-account';
import { TipsServiceProvider } from '../providers/tips-service/tips-service';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('content') navCtrl: NavController;

  tip: any;
  tips: any;

  lang1: any;
  rootPage: any = null;
  pages: Array<{ title: any, component: any }>;

  private requestOptions: any = {
    method: "",
    path: "",
    body: ''
  };





  constructor(private alertCtrl: AlertController, private httpService: HttpServiceProvider, private loading: LoadingServiceProvider, private langueg: LangServiceProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, public translate: TranslateService, private tipsServiceProvider: TipsServiceProvider) {

    // this.storage.get('hideTutorial').then((val) => {
    //   if (val == null || val == false)
    //     this.rootPage = WelcomePage;
    //   else
    //     // this.rootPage = RegistrationPage;
    //     this.rootPage = WelcomePage;

    // })

    this.storage.get('flagNationalNumber').then(async (val) => {

      if (val == null || val == false)
        this.rootPage = WelcomePage;
      else {

        this.loading.showLoading();

        this.requestOptions.path = "profile/" + val;

        this.requestOptions.method = "GET";

        let response = await this.httpService.http_request(this.requestOptions);


        if (response.status == 200) {


          if (response.json().body.customerSubAccountList.length > 1) {
            PublicVarProvider.setProfile(response.json().body);
            this.rootPage = SelectAccountPage;

          } else {
            PublicVarProvider.setUser(response.json().body.customerSubAccountList[0]);
            PublicVarProvider.setProfile(response.json().body);
            this.rootPage = HomePage;


          }



          this.loading.dismissLoading();

        } else {


          let alert = this.alertCtrl.create({
            title: this.langueg.getTranslate('Error'),
            subTitle:this.langueg.getTranslate(response.key),
            buttons: [this.langueg.getTranslate('Ok')]
          });
          alert.present();

          this.loading.dismissLoading();
          this.rootPage = HomePage;

        }

      }
    })




    this.storage.get('flagLanguage').then((val) => {
      if (val == null || val == "ar") {
        translate.setDefaultLang('ar');
        translate.use('ar');
        this.lang1 = "ar";
      }

      else {
        translate.setDefaultLang('en');
        translate.use('en');
        this.lang1 = "en";
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


      // platform.setDir('rtl', true);
      // statusBar.styleDefault();
      // let status bar overlay webview
      statusBar.overlaysWebView(false);

      // set status bar to white
      statusBar.styleBlackOpaque();
      statusBar.backgroundColorByHexString('#26464f');


      splashScreen.hide();
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar' || event.lang == null) {
        platform.setDir('rtl', true);
        this.getTips();

      }
      else {
        platform.setDir('ltr', true);
        this.getTips();

      }
    });

    setInterval(() => {
      this.tipsServiceProvider.tipsIndex++;
      if (this.tipsServiceProvider.tipsIndex == (this.tipsServiceProvider.tipsArray.length - 1)) {
        this.tipsServiceProvider.tipsIndex = 0;
      }
      this.storage.get('flagLanguage').then((val) => {
        if (val == null || val == "ar") {
          this.tipsServiceProvider.tipsText = this.tipsServiceProvider.tipsArray[this.tipsServiceProvider.tipsIndex].arabicText;
        }
        else {
          this.tipsServiceProvider.tipsText = this.tipsServiceProvider.tipsArray[this.tipsServiceProvider.tipsIndex].englishText;
        }
      });
    }, 90000);

  }

  switchLanguage1() {
    this.translate.use(this.lang1);
    this.storage.set('flagLanguage', this.lang1);
  }

  goToHomePage() {
    this.nav.setRoot(HomePage);
  }


  async getTips() {

    this.requestOptions.path = "tips";

    this.requestOptions.method = "GET";

    let response = await this.httpService.http_request(this.requestOptions);


    if (response.status == 200) {

      this.tipsServiceProvider.tipsArray = response.json().body;

      this.storage.get('flagLanguage').then((val) => {


        if (val == null || val == "ar") {
          this.tipsServiceProvider.tipsText = this.tipsServiceProvider.tipsArray[this.tipsServiceProvider.tipsIndex].arabicText;
        }
        else {
          this.tipsServiceProvider.tipsText = this.tipsServiceProvider.tipsArray[this.tipsServiceProvider.tipsIndex].englishText;
        }
      });

    } else {


      let alert = this.alertCtrl.create({
        title: this.langueg.getTranslate('Error'),
        subTitle: this.langueg.getTranslate(response.key),
        buttons: [this.langueg.getTranslate('Ok')]
      });
      alert.present();


    }
  }

}

