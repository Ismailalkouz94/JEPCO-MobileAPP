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

  constructor(private storage: Storage, private langueg: LangServiceProvider, private httpService: HttpServiceProvider, private alertCtrl: AlertController, public navCtrl: NavController, public menuCtrl: MenuController, public popoverCtrl: PopoverController, private tipsServiceProvider: TipsServiceProvider) {
    this.menuCtrl.enable(true, 'myMenu');
    // this.getTips()
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
    this.navCtrl.push(TabsForCalcoulateComponent);
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
