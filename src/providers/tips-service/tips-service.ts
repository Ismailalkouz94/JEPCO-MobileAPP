import { Injectable } from '@angular/core';

@Injectable()
export class TipsServiceProvider {

  public tipsText: string = '';

  public tipsIndex: number = 0;

  public tipsArray: any = [];

  constructor() {

  }

  

}
