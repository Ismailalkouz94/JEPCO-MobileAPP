import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { LangServiceProvider } from '../lang-service/lang-service';

/*
  Generated class for the LoadingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingServiceProvider {

  loading: any;


  constructor(public loadingCtrl: LoadingController,private lang:LangServiceProvider) {
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: this.lang.getTranslate('wait')
    });
  
    this.loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }


}
