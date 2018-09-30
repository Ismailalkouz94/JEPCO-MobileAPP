import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PublicVarProvider } from '../../providers/public-var/public-var';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { LangServiceProvider } from '../../providers/lang-service/lang-service';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * Generated class for the CalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {

  calculatForm: FormGroup;


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

  newValue:any;


  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private loading: LoadingServiceProvider, private lang: LangServiceProvider, private httpService: HttpServiceProvider) {
    this.calculatForm = new FormGroup({
      meterRead: new FormControl('', Validators.required),
    });
  }

  async ionViewDidLoad() {
    await this.GetBills();
  }


  async GetBills() {

    this.loading.showLoading();

    this.requestOptions.path = "history/" + PublicVarProvider.getUser().fileNumber;

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

  private markFormGroupTouched() {
    Object.keys(this.calculatForm.controls).forEach(key => {
      this.calculatForm.get(key).markAsDirty();
    });  
  }


  async CalculateService() {

    this.markFormGroupTouched();


    if (this.calculatForm.valid) {


      this.loading.showLoading();

      this.requestOptions.path = "calculate/" + PublicVarProvider.getUser().fileNumber + "/reading/" + this.calculatForm.get('meterRead').value;

      this.requestOptions.method = "GET";

      let response = await this.httpService.http_request(this.requestOptions);

      if (response.status == 200) {

        this.newValue =  response.json().body;
        console.log('this.newValuethis.newValue',this.newValue);
        this.loading.dismissLoading();

        let alert = this.alertCtrl.create({
          title: this.lang.getTranslate('c_valueCA'),
          subTitle: this.lang.getTranslate('c_carentValue') + this.newValue,
          buttons: [this.lang.getTranslate('Ok')]
        });
        alert.present();

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

}
