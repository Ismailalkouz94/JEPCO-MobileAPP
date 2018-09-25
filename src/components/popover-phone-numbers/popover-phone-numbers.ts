import { Component } from '@angular/core';
import { CallNumber } from '../../../node_modules/@ionic-native/call-number';

/**
 * Generated class for the PopoverPhoneNumbersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-phone-numbers',
  templateUrl: 'popover-phone-numbers.html'
})
export class PopoverPhoneNumbersComponent {


  constructor(private callNumber: CallNumber ) {

  }

  call(){
    this.callNumber.callNumber("0096265503600", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));

  }
  call1(){
    this.callNumber.callNumber("00962796983230", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));

  }
  call2(){
    this.callNumber.callNumber("0096264790000", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));

  }
}
