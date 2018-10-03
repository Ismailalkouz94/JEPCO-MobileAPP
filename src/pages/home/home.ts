import { Component, ViewChild } from '@angular/core';
import { NavController, FabContainer, Button, MenuController, PopoverController, AlertController } from 'ionic-angular';
import { PublicVarProvider } from '../../providers/public-var/public-var';
import { PreviousInvoicesPage } from '../previous-invoices/previous-invoices';
// import { CalculatorPage } from '../calculator/calculator';
import { PopoverComponent } from '../../components/popover/popover';
import { TabsForPaymentComponent } from '../../components/tabs-for-payment/tabs-for-payment';
import { PaymentMethodPage } from '../payment-method/payment-method';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LangServiceProvider } from '../../providers/lang-service/lang-service';
import { Storage } from '@ionic/storage';
import { TipsServiceProvider } from '../../providers/tips-service/tips-service';
import { TabsForCalcoulateComponent } from '../../components/tabs-for-calcoulate/tabs-for-calcoulate';
import { CalculatorPage } from '../calculator/calculator';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Platform } from 'ionic-angular/platform/platform';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fabBtn: Button;
  tipsView: boolean = true;

  tip: any;
  private requestOptions: any = {
    method: "",
    path: "",
    body: ''
  };

  // fab: FabContainer
  @ViewChild('fab') fabElement: FabContainer;

  constructor(private storage: Storage,
    private langueg: LangServiceProvider,
    private httpService: HttpServiceProvider,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public translate: TranslateService,
    public platform: Platform,
    private tipsServiceProvider: TipsServiceProvider) {
    this.menuCtrl.enable(true, 'myMenu');
    this.getTips()

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

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar' || event.lang == null) {
        this.getTips();

      }
      else {
        this.getTips();

      }
    });

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

    } /*else {


      let alert = this.alertCtrl.create({
        title: this.langueg.getTranslate('Error'),
        subTitle: this.langueg.getTranslate(response.key),
        buttons: [this.langueg.getTranslate('Ok')]
      });
      alert.present();


    }*/
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });

    console.log(" PublicVarProvider.getTip();" + PublicVarProvider.getTip());
  }

  ionViewDidEnter() {
    // this.calculateButtons();
  }

  // calculateButtons() {
  //   this.fabElement.setActiveLists(true);
  // }



  goToPaymentCen() {
    this.navCtrl.push(TabsForPaymentComponent);
  }

  goToPreviousInvoice() {
    this.navCtrl.push(PreviousInvoicesPage);
  }

  goToCalculator() {
    this.navCtrl.push(CalculatorPage);
  }

  goToPaymentMethod() {
    this.navCtrl.push(PaymentMethodPage);
  }

  getUser() {
    return PublicVarProvider.getUser();
  }

  getTibsService() {
    return PublicVarProvider.getTip();
  }



}
