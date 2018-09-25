import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { Validators, FormGroup, FormControl } from '@angular/forms';
import "rxjs/add/observable/timer";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/map";
import { LangServiceProvider } from '../../providers/lang-service/lang-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { PublicVarProvider } from '../../providers/public-var/public-var';
import { SelectAccountPage } from '../select-account/select-account';


/**
 * Generated class for the VarCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-var-code',
  templateUrl: 'var-code.html',
})
export class VarCodePage {

  vertifyForm: FormGroup;

  private requestOptions: any = {
    method: "",
    path: "",
    body: ''
  };


  countdown: number;

  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, /*private storage: Storage,*/ private httpService: HttpServiceProvider, private loading: LoadingServiceProvider, private lang: LangServiceProvider , private storage: Storage) {
    this.startCountdownTimer();

    this.vertifyForm = new FormGroup({
      code: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    // let firstName = this.navParams.get('firstName');
    // let lastName = this.navParams.get('lastName');
    // let nationalNumber = this.navParams.get('nationalNumber');
    // let mobileNumber = this.navParams.get('mobileNumber');
    // let fileNumber = this.navParams.get('fileNumber');
    let code = this.navParams.get('code');


  }
  startCountdownTimer() {
    const interval = 1000;
    const duration = 60 * 1000;
    const stream$ = Observable.timer(0, interval)
      .finally(() => console.log("All done!"))
      .takeUntil(Observable.timer(duration + interval))
      .map(value => duration - value * interval);
    stream$.subscribe(value => this.countdown = value / 1000);
  }



  async resendCode() {

    this.loading.showLoading();
    // this.showLoading();
    //request
    this.requestOptions.path = "sms/send";

    this.requestOptions.method = "POST";

    this.vertifyForm.value.firstName = this.navParams.get('firstName');

    this.vertifyForm.value.lastName = this.navParams.get('lastName');

    this.vertifyForm.value.nationalNumber = this.navParams.get('nationalNumber');

    this.vertifyForm.value.fileNumber = this.navParams.get('fileNumber');

    this.vertifyForm.value.mobileNumber = this.navParams.get('mobileNumber');

    this.requestOptions.body = this.vertifyForm.value;

    let response = await this.httpService.http_request(this.requestOptions);

    console.log('response', response);

    if (response.status == 200) {

      this.startCountdownTimer();

      this.loading.dismissLoading();

      this.navCtrl.setRoot(VarCodePage, this.requestOptions.body);
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


  async submitForm() {

    this.markFormGroupTouched();

    if (this.vertifyForm.valid) {

      this.loading.showLoading();

      this.requestOptions.path = "profile/create";

      this.requestOptions.method = "POST";

      this.vertifyForm.value.firstName = this.navParams.get('firstName');

      this.vertifyForm.value.lastName = this.navParams.get('lastName');

      this.vertifyForm.value.nationalNumber = this.navParams.get('nationalNumber');

      this.vertifyForm.value.fileNumber = this.navParams.get('fileNumber');

      this.vertifyForm.value.mobileNumber = this.navParams.get('mobileNumber');

      this.requestOptions.body = this.vertifyForm.value;

      let response = await this.httpService.http_request(this.requestOptions);

      console.log('response', response);

      if (response.status == 200) {
        this.loading.dismissLoading();

        this.storage.set('flagNationalNumber', this.navParams.get('nationalNumber'));
        // PublicVarProvider.setUser(response.json().body.customerSubAccountList[0]);
        // PublicVarProvider.setProfile(response.json().body)  ;
        // this.navCtrl.setRoot(HomePage);

        if (response.json().body.customerSubAccountList.length > 1) {
          PublicVarProvider.setProfile(response.json().body);
          this.navCtrl.setRoot(SelectAccountPage);

  
        } else {
          PublicVarProvider.setUser(response.json().body.customerSubAccountList[0]);
          PublicVarProvider.setProfile(response.json().body) 
          this.navCtrl.setRoot(HomePage);
      
        
        }

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
  }


  private markFormGroupTouched() {
    (<any>Object).values(this.vertifyForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

}
