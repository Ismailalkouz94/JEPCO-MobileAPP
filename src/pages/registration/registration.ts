import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PublicVarProvider } from '../../providers/public-var/public-var';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { VarCodePage } from '../var-code/var-code';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { LangServiceProvider } from '../../providers/lang-service/lang-service';
import { ImageModalPage } from '../../pages/imageModal/imageModal';

// import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  registrationForm: FormGroup;

  private requestOptions: any = {
    method: "",
    path: "",
    body: ''
  };

  // loading: any;

  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController, platform: Platform, public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private storage: Storage, private httpService: HttpServiceProvider, private loading: LoadingServiceProvider, private lang: LangServiceProvider, private modalCtrl: ModalController) {
    this.menuCtrl.enable(false, 'myMenu');
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      nationalNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
      fileNum: new FormControl('', Validators.required),
      fileNum1: new FormControl('', Validators.required),
      fileNum2: new FormControl('', Validators.required),
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


      // platform.setDir('rtl', true);

    });

    this.storage.get('flagLanguage').then((val) => {
      console.log(val);
      if (val == null || val == "ar") {
        platform.setDir('rtl', true);
      }
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }
  ToHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  async submitForm() {

    this.markFormGroupTouched();

    if (this.registrationForm.valid) {

      this.loading.showLoading();
      // this.showLoading();
      //request
      this.requestOptions.path = "sms/send";

      this.requestOptions.method = "POST";

      this.registrationForm.value.fileNumber = this.registrationForm.get('fileNum2').value + this.registrationForm.get('fileNum1').value + this.registrationForm.get('fileNum').value;

      this.requestOptions.body = this.registrationForm.value;

      let response = await this.httpService.http_request(this.requestOptions);

      console.log('response', response);

      if (response.status == 200) {
        // this.dismissLoading();
        this.loading.dismissLoading();

        this.navCtrl.setRoot(VarCodePage, this.requestOptions.body);
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
    Object.keys(this.registrationForm.controls).forEach(key => {
      this.registrationForm.get(key).markAsDirty();
    });    
    // (<any>Object).values(this.registrationForm.controls).forEach(control => {
    //   control.markAsTouched();
    // });
  }

  // showLoading(){
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });

  //   this.loading.present();
  // }

  // dismissLoading(){
  //   this.loading.dismiss();
  // }

  openImage() {
    let imgModal = this.modalCtrl.create(ImageModalPage);

    imgModal.present();
  }



  // moveFocus(nextElement) {
  //   nextElement.setFocus();
  // }


  keytab(nextElement, maxLength , y , backElement) {
      if(this.registrationForm.get('fileNum'+y).value.length == maxLength)
      nextElement.setFocus();   // focus if not null
      if(this.registrationForm.get('fileNum'+y).value.length==0)
      backElement.setFocus();
  }
}
