import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
// import { HomePage } from '../home/home';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { LangServiceProvider } from '../../providers/lang-service/lang-service';
import { Storage } from '@ionic/storage';
import { PublicVarProvider } from '../../providers/public-var/public-var';
import { ImageModalPage } from '../../pages/imageModal/imageModal';




/**
 * Generated class for the AddSubProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-sub-profile',
  templateUrl: 'add-sub-profile.html',
})
export class AddSubProfilePage {

  AddSubForm: FormGroup;

  private requestOptions: any = {
    method: "",
    path: "",
    body: ''
  };

  constructor( private storage: Storage,private lang:LangServiceProvider, private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServiceProvider , private loading:LoadingServiceProvider,private modalCtrl :ModalController) {
    this.AddSubForm = new FormGroup({
      alias: new FormControl('', Validators.required),
      fileNum: new FormControl('', Validators.required),
      fileNum1: new FormControl('', Validators.required),
      fileNum2: new FormControl('', Validators.required),

    });
  }

  ionViewDidLoad() {
  }

  async submitForm() {

    this.markFormGroupTouched();

    if (this.AddSubForm.valid) {

      this.loading.showLoading();
      // this.showLoading();
      //request
      this.requestOptions.path = "sub/create";

      this.requestOptions.method = "POST";

      this.AddSubForm.value.fileNumber = this.AddSubForm.get('fileNum2').value + this.AddSubForm.get('fileNum1').value + this.AddSubForm.get('fileNum').value;
      
      this.AddSubForm.value.nationalNumber = await this.storage.get('flagNationalNumber').then(response => response);
     
      this.requestOptions.body = this.AddSubForm.value;

      let response = await this.httpService.http_request(this.requestOptions);

      console.log('response', response);

      if (response.status == 200) {
        // this.dismissLoading();
        this.loading.dismissLoading();
        PublicVarProvider.getProfile().customerSubAccountList.push(response.json().body);
        this.navCtrl.pop();

      } else {
        // this.dismissLoading();
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
    (<any>Object).values(this.AddSubForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }


  openImage() {
    let imgModal = this.modalCtrl.create(ImageModalPage);

    imgModal.present();
  }

  keytab(nextElement, maxLength , y , backElement) {
    if(this.AddSubForm.get('fileNum'+y).value.length == maxLength)
    nextElement.setFocus();   // focus if not null
    if(this.AddSubForm.get('fileNum'+y).value.length==0)
    backElement.setFocus();
}

}
