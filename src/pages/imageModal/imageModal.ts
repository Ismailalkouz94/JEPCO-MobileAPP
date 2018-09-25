import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ViewController } from 'ionic-angular';
 
@Component({
  selector: 'page-image-modal',
  templateUrl: 'imageModal.html'
})
export class ImageModalPage {

  loading: any;

  constructor(public nav: NavController, public http:Http, public viewCtrl: ViewController, public loadingCtrl: LoadingController,) {
  }

  async ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}