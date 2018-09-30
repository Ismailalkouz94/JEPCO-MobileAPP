import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, Marker, GoogleMapOptions, Circle } from '@ionic-native/google-maps'
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { LangServiceProvider } from '../../providers/lang-service/lang-service';
import { HttpServiceProvider } from '../../providers/http-service/http-service';





@IonicPage()
@Component({
  selector: 'page-payment-centers',
  templateUrl: 'payment-centers.html',
})
export class PaymentCentersPage {

  centersList: any ;


  private requestOptions: any = {
    method: "",
    path: "",
    body: ''
  };



  map: GoogleMap;

  @ViewChild('map') mapElement: ElementRef;

  constructor(private loading: LoadingServiceProvider, private lang: LangServiceProvider, private httpService: HttpServiceProvider,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {

  }

  async ionViewDidLoad() {
    await this.GetCenters();
    this.loadMap();
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 31.943214,
          lng: 35.926761
        },
        zoom: 11,
        tilt: 30
      }
    };

    this.map = new GoogleMap('map12', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Wesam Home',

      icon: 'Red',
      animation: 'DROP',
      position: {
        lat: 31.962155,
        lng: 35.973603
      }
    });

      this.map.addMarkerSync({
      title: 'BI',
      snippet: 'business innovation',
      icon: 'Blue',
      animation: 'DROP',
      position: {
        lat: 31.996709,
        lng: 35.841628,
      }
    });

  //   this.centersList.forEach(element => {

  //     this.map.addMarkerSync({
  //       title: this.centersList.name ,
  //       snippet: this.centersList.address,
  //       snippet1: this.centersList.phoneNumber,
  //       icon: 'Red',
  //       animation: 'DROP',
  //       position: {
  //         lat:  this.centersList.latitude,
  //         lng:  this.centersList.longitude,
  //       }
  //     });
     
  //  });


  this.map.addMarkerSync({
          title: this.centersList.name ,
          snippet: this.centersList.address,
          snippet1: this.centersList.phoneNumber,
          icon: 'Red',
          animation: 'DROP',
          position: {
            lat:  this.centersList.latitude,
            lng:  this.centersList.longitude,
          }
        });











    // this.map.addMarker({
    //   title: 'BI',
    //   snippet: 'business innovation',
    //   icon: 'Blue',
    //   animation: 'DROP',
    //   position: {
    //     lat: 31.996709,
    //     lng: 35.991628,
    //   }
      
    // })
    //to Add circle to log and lat 
    // .then((marker1 : Marker)=> {
    //   this.map.addCircle({
    //     center : marker1.getPosition(),
    //     radius:10,
    //     fillColor: "rgba(0, 0, 255, 0.5)",
    //     strokeColor: "rgba(0, 0, 255, 0.5)",
    //     strokeWidth: 1
    //   }).then((circle : Circle)=> {
    //     marker1.bindTo("position", circle , "center")
    //   })
    // })
  }





  async GetCenters() {

    this.loading.showLoading();

    this.requestOptions.path = "centers";

    this.requestOptions.method = "GET";

    let response = await this.httpService.http_request(this.requestOptions);

    if (response.status == 200) {

      console.log("response.json().body>>>>",response.json().body);
      this.centersList = response.json().body;

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
}
