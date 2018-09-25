import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PublicVarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PublicVarProvider {


  static serviceUrl: string;

  static user: any;
  static profile:any;

  static tip:any;


  public static getTip(): any {
    return this.tip;
  }


  public static setTip(tip: any) {
    this.tip = tip;
  }

  public static setUser(user: any) {
    this.user = user;
  }
  

  public static getUser(): any {
    return this.user;
  }


  public static setProfile(profile: any) {
    this.profile = profile;
  }

  public static getProfile(): any {
    return this.profile;
  }

}
