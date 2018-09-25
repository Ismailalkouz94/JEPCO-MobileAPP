import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the MapModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare const google;


@IonicPage()
@Component({
  selector: 'page-map-modal',
  templateUrl: 'map-modal.html',
})
export class MapModalPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  center: any;

  constructor(public platform: Platform, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.center = this.navParams.get('center');
    platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: { lat: this.center.latitude , lng: this.center.longitude }
    });
    let location = { lat: this.center.latitude , lng: this.center.longitude }
    this.addMarker(location);
  }

  addMarker(location, image = null) {
    let marker = null;
    marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }

  ionViewDidLoad() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getCenterName(){
    return this.center;
  }

}
