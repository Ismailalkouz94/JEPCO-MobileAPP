import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { LangServiceProvider } from '../../providers/lang-service/lang-service';


/**
 * Generated class for the PaymentCenterMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


declare const google;


@IonicPage()
@Component({
  selector: 'page-payment-center-map',
  templateUrl: 'payment-center-map.html',
})
export class PaymentCenterMapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];

  private requestOptions: any = {
    method: "",
    path: "",
    body: ''
  };

  centersList: any = [];

  constructor(public platform: Platform, private geolocation: Geolocation, private loading: LoadingServiceProvider, private lang: LangServiceProvider, private httpService: HttpServiceProvider, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    platform.ready().then(() => {
      this.initMap();
    });
  }

  async ionViewDidLoad() {
    await this.GetCenters();
  }


  // initMap() {
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //     zoom: 7,
  //     center: {lat: 41.85, lng: -87.65}
  //   });
  // }


  initMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 9,
        center: mylocation
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      console.log('updatelocation,', updatelocation);
      let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      this.addMarker(updatelocation, image);
      for (let index = 0; index < this.centersList.length; index++) {
        let location = new google.maps.LatLng(this.centersList[index].latitude, this.centersList[index].longitude);
        let title = this.centersList[index].hostName.name;
        let snippet = this.centersList[index].address;
        let snippet1 = this.centersList[index].phoneNumber;
        this.addMarkers(location , title , snippet , snippet1);
      }
      this.setMapOnAll(this.map);
    });

  }



  addMarker(location, image = null ) {
    let marker = null;
      marker = new google.maps.Marker({
        position: location,
        map: this.map,
        icon: image
      });
    this.markers.push(marker);
  }

  addMarkers(location, title , snippet , snippet1) {
    let marker = null;

      marker = new google.maps.Marker({
        position: location,
        map: this.map,
      });

      let content = "<h4 style='font-size: 1.5rem;line-height: 0;margin-bottom: 0px;'>"+title+"</h4><br/><h2 style='font-size: 1.3rem;line-height: 0;margin-top: 0px;margin-bottom: 0px;'>"+"</h2><br/><h2 style='color:red;font-size: 1.1rem;line-height: 0;margin-top: 0px;'>"+snippet1+"</h2>";

      this.addInfoWindow(marker, content);
    
    this.markers.push(marker);
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  async GetCenters() {

    this.loading.showLoading();

    this.requestOptions.path = "centers";

    this.requestOptions.method = "GET";

    let response = await this.httpService.http_request(this.requestOptions);

    if (response.status == 200) {

      console.log("response.json().body>>>>", response.json().body);
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



